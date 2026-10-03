// ==UserScript==
// @name         MCFunction Searchable Grid POC V5
// @namespace    https://github.com/crosschang/block_command_maker
// @version      0.5.0-poc
// @description  Search box mounted inside the Blockly picker to preserve typing/focus.
// @match        https://minecraft.makecode.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==


(function () {
    "use strict";

    const BAR_CLASS = "mcfunction-search-grid-v5-bar";
    const MIN_OPTIONS = 20;
    let session = null;

    function norm(s) {
        return (s || "")
            .toLowerCase()
            .trim()
            .replace(/^minecraft:/, "")
            .replace(/\s+/g, "_");
    }

    function isDisplayed(el) {
        if (!el || !el.isConnected) return false;
        const r = el.getBoundingClientRect();
        const st = getComputedStyle(el);
        return r.width > 0 &&
               r.height > 0 &&
               st.display !== "none" &&
               st.visibility !== "hidden";
    }

    function labelOf(el) {
        return (
            el.getAttribute("aria-label") ||
            el.getAttribute("title") ||
            el.textContent ||
            ""
        ).trim();
    }

    function isMinecraftValue(text) {
        return /^minecraft:[a-z0-9_]+$/i.test((text || "").trim());
    }

    function collectVisibleMinecraftOptions() {
        const selectors = [
            '[role="gridcell"]',
            '[role="option"]',
            '[role="menuitem"]',
            '.blocklyMenuItem',
            '.blocklyDropdownMenuItem',
            'button'
        ];

        const seen = new Set();
        const result = [];

        for (const selector of selectors) {
            document.querySelectorAll(selector).forEach(el => {
                if (seen.has(el) || !isDisplayed(el)) return;
                if (!isMinecraftValue(labelOf(el))) return;
                seen.add(el);
                result.push(el);
            });
        }

        if (result.length >= MIN_OPTIONS) return result;

        const roots = Array.from(document.querySelectorAll(
            '.blocklyDropDownDiv, .blocklyWidgetDiv, [class*="blocklyDropDown"], [class*="blocklyWidget"]'
        )).filter(isDisplayed);

        for (const root of roots) {
            root.querySelectorAll('div, span, td, li').forEach(el => {
                if (seen.has(el) || !isDisplayed(el)) return;

                const text = (el.textContent || "").trim();
                if (!isMinecraftValue(text)) return;

                const childSame = Array.from(el.children).some(ch =>
                    isMinecraftValue((ch.textContent || "").trim())
                );
                if (childSame) return;

                seen.add(el);
                result.push(el);
            });
        }

        return result;
    }

    function commonAncestor(nodes) {
        if (!nodes.length) return null;

        let cur = nodes[0];
        while (cur && cur !== document.body) {
            if (nodes.every(n => cur.contains(n))) return cur;
            cur = cur.parentElement;
        }

        return document.body;
    }

    function findPopupRoot(options) {
        const common = commonAncestor(options);
        if (!common) return null;

        // Prefer an existing Blockly popup ancestor so clicks in the search box
        // are treated as clicks *inside* the picker, not outside-click dismissals.
        let cur = common;
        while (cur && cur !== document.body) {
            const cls = String(cur.className || "");
            if (
                cls.includes("blocklyDropDownDiv") ||
                cls.includes("blocklyWidgetDiv") ||
                cls.toLowerCase().includes("dropdown")
            ) {
                return cur;
            }
            cur = cur.parentElement;
        }

        return common;
    }

    function popupStillOpen(s) {
        if (!s || !s.root || !s.root.isConnected) return false;
        if (!s.options.some(x => x && x.isConnected)) return false;

        const st = getComputedStyle(s.root);
        const r = s.root.getBoundingClientRect();

        return st.display !== "none" &&
               st.visibility !== "hidden" &&
               r.width > 0 &&
               r.height > 0;
    }

    function cleanup() {
        if (!session) return;

        for (const el of session.options) {
            if (el && el.isConnected) el.style.display = "";
        }

        if (session.bar && session.bar.isConnected) {
            session.bar.remove();
        }

        session = null;
        console.info("[MCFunction Search Grid V5] detached");
    }

    function attach(options) {
        if (session || !options || options.length < MIN_OPTIONS) return;

        const root = findPopupRoot(options);
        if (!root || root === document.body) return;

        const bar = document.createElement("div");
        bar.className = BAR_CLASS;
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
            "border:1px solid rgba(255,255,255,.45)",
            "box-shadow:0 2px 8px rgba(0,0,0,.28)",
            "border-radius:6px"
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
            "border:1px solid #777",
            "border-radius:5px",
            "background:#fff",
            "color:#111",
            "font:600 14px system-ui,-apple-system,Segoe UI,sans-serif",
            "outline:none"
        ].join(";");

        const count = document.createElement("span");
        count.style.cssText = [
            "min-width:78px",
            "color:#fff",
            "text-align:right",
            "font:600 12px system-ui,-apple-system,Segoe UI,sans-serif"
        ].join(";");

        bar.appendChild(input);
        bar.appendChild(count);

        // Critical V5 change:
        // mount inside the MakeCode/Blockly picker DOM instead of document.body.
        root.insertBefore(bar, root.firstChild);

        session = {
            root,
            options: options.slice(),
            bar,
            input,
            count
        };

        function applyFilter() {
            if (!session) return;

            const q = norm(input.value);
            let shown = 0;

            for (const el of session.options) {
                if (!el || !el.isConnected) continue;

                const match = !q || norm(labelOf(el)).includes(q);
                el.style.display = match ? "" : "none";
                if (match) shown++;
            }

            count.textContent = shown + " / " + session.options.length;
        }

        input.addEventListener("input", applyFilter);

        // Let the input perform normal text editing, but keep MakeCode/Blockly
        // keyboard shortcuts from receiving the key events.
        for (const ev of ["keydown", "keyup", "keypress"]) {
            input.addEventListener(ev, e => e.stopPropagation());
        }

        // Pointer events remain inside the picker; stop bubbling to Blockly
        // item handlers while keeping default focus behavior.
        for (const ev of ["mousedown", "pointerdown", "touchstart", "click"]) {
            bar.addEventListener(ev, e => e.stopPropagation());
        }

        applyFilter();

        setTimeout(() => {
            if (!session) return;
            try { input.focus({ preventScroll: true }); }
            catch (_) { input.focus(); }
        }, 30);

        console.info(
            "[MCFunction Search Grid V5] attached once:",
            session.options.length,
            "minecraft:* options",
            "root=",
            root.className || root.tagName
        );
    }

    function tick() {
        if (session) {
            if (!popupStillOpen(session)) cleanup();
            return;
        }

        const options = collectVisibleMinecraftOptions();
        if (options.length >= MIN_OPTIONS) attach(options);
    }

    const observer = new MutationObserver(() => {
        Promise.resolve().then(tick);
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "aria-hidden"]
    });

    setInterval(tick, 500);
    tick();

    console.info("[MCFunction Search Grid V5] ready");
})();
