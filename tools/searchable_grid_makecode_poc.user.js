// ==UserScript==
// @name         MCFunction Searchable Grid POC V2
// @namespace    https://github.com/crosschang/block_command_maker
// @version      0.2.0-poc
// @description  Adds a search bar to large Blockly role=grid pickers in Minecraft MakeCode.
// @match        https://minecraft.makecode.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==


(function () {
    "use strict";

    const ATTR = "data-mcfunction-search-grid-v2";
    const MIN_CELLS = 20;

    function norm(s) {
        return (s || "")
            .toLowerCase()
            .trim()
            .replace(/^minecraft:/, "")
            .replace(/\s+/g, "_");
    }

    function labelOf(cell) {
        const button = cell.querySelector("button");
        return (
            cell.getAttribute("aria-label") ||
            cell.getAttribute("title") ||
            (button && (
                button.getAttribute("aria-label") ||
                button.getAttribute("title") ||
                button.textContent
            )) ||
            cell.textContent ||
            ""
        ).trim();
    }

    function cellsOf(grid) {
        return Array.from(grid.querySelectorAll('[role="gridcell"]'));
    }

    function updateRows(grid) {
        const rows = Array.from(grid.querySelectorAll('[role="row"]'));
        for (const row of rows) {
            const cells = Array.from(row.querySelectorAll(':scope > [role="gridcell"], [role="gridcell"]'));
            if (!cells.length) continue;
            row.style.display = cells.some(c => c.style.display !== "none") ? "" : "none";
        }
    }

    function attach(grid) {
        if (!grid || grid.hasAttribute(ATTR)) return;

        let cells = cellsOf(grid);
        if (cells.length < MIN_CELLS) return;

        grid.setAttribute(ATTR, "1");

        const host = grid.parentElement || grid;

        const bar = document.createElement("div");
        bar.className = "mcfunction-search-grid-v2-bar";
        bar.style.cssText = [
            "position:sticky",
            "top:0",
            "z-index:2147483647",
            "display:flex",
            "align-items:center",
            "gap:8px",
            "padding:8px",
            "margin:0 0 6px 0",
            "background:#2f2f2f",
            "border-bottom:1px solid rgba(255,255,255,.22)"
        ].join(";");

        const input = document.createElement("input");
        input.type = "search";
        input.placeholder = "Search Registry…";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.style.cssText = [
            "flex:1",
            "min-width:260px",
            "height:36px",
            "padding:6px 10px",
            "border:1px solid rgba(255,255,255,.35)",
            "border-radius:6px",
            "background:#fff",
            "color:#111",
            "font:600 14px system-ui,-apple-system,Segoe UI,sans-serif",
            "outline:none"
        ].join(";");

        const count = document.createElement("span");
        count.style.cssText = [
            "min-width:76px",
            "text-align:right",
            "color:#fff",
            "font:600 12px system-ui,-apple-system,Segoe UI,sans-serif"
        ].join(";");

        bar.appendChild(input);
        bar.appendChild(count);

        host.insertBefore(bar, grid);

        function apply() {
            cells = cellsOf(grid);
            const q = norm(input.value);
            let visible = 0;

            for (const cell of cells) {
                const match = !q || norm(labelOf(cell)).includes(q);
                cell.style.display = match ? "" : "none";
                if (match) visible++;
            }

            updateRows(grid);
            count.textContent = visible + " / " + cells.length;
        }

        input.addEventListener("input", apply);

        // Prevent Blockly from interpreting typing/clicking as picker interactions.
        for (const ev of ["mousedown", "pointerdown", "touchstart", "click", "keydown"]) {
            bar.addEventListener(ev, e => e.stopPropagation());
        }

        const mo = new MutationObserver(() => {
            if (!grid.isConnected) {
                mo.disconnect();
                return;
            }
            apply();
        });

        mo.observe(grid, { childList: true, subtree: true });

        apply();

        setTimeout(() => {
            try { input.focus({ preventScroll: true }); }
            catch (_) { input.focus(); }
        }, 50);

        console.info("[MCFunction Search Grid V2] attached", cells.length, "cells");
    }

    function scan() {
        document.querySelectorAll('[role="grid"]').forEach(attach);
    }

    const rootObserver = new MutationObserver(scan);
    rootObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["role", "class", "style", "aria-hidden"]
    });

    setInterval(scan, 400);
    scan();

    console.info("[MCFunction Search Grid V2] ready");
})();
