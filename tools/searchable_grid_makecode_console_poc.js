(function () {
    "use strict";

    const MARK = "data-mcfunction-search-poc";
    const MIN_OPTIONS = 20;

    function normalize(value) {
        return (value || "")
            .toLowerCase()
            .trim()
            .replace(/^minecraft:/, "")
            .replace(/\s+/g, "_");
    }

    function candidateItems(container) {
        const selectors = [
            '[role="gridcell"]',
            '[role="option"]',
            '[role="menuitem"]',
            '.blocklyMenuItem',
            '.blocklyDropdownMenuItem'
        ];

        const seen = new Set();
        const result = [];

        for (const selector of selectors) {
            for (const node of container.querySelectorAll(selector)) {
                if (seen.has(node)) continue;

                const label =
                    node.getAttribute("aria-label") ||
                    node.getAttribute("title") ||
                    node.textContent ||
                    "";

                if (!label.trim()) continue;

                seen.add(node);
                result.push(node);
            }
        }

        return result;
    }

    function itemLabel(node) {
        return (
            node.getAttribute("aria-label") ||
            node.getAttribute("title") ||
            node.textContent ||
            ""
        );
    }

    function findDropdowns() {
        return Array.from(document.querySelectorAll(
            ".blocklyDropDownDiv, .blocklyWidgetDiv"
        ));
    }

    function attach(container) {
        if (!container || container.hasAttribute(MARK)) return;

        let items = candidateItems(container);
        if (items.length < MIN_OPTIONS) return;

        container.setAttribute(MARK, "1");

        const wrap = document.createElement("div");
        wrap.className = "mcfunction-search-poc-wrap";
        wrap.style.cssText = [
            "position:sticky",
            "top:0",
            "z-index:99999",
            "padding:8px",
            "background:var(--pxt-page-background,#fff)",
            "border-bottom:1px solid rgba(0,0,0,.18)"
        ].join(";");

        const input = document.createElement("input");
        input.type = "search";
        input.placeholder = "Search Registry…";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.style.cssText = [
            "display:block",
            "width:100%",
            "min-width:260px",
            "height:34px",
            "padding:6px 10px",
            "border:1px solid rgba(0,0,0,.35)",
            "border-radius:6px",
            "font:14px system-ui,-apple-system,Segoe UI,sans-serif",
            "background:#fff",
            "color:#111",
            "outline:none"
        ].join(";");

        const status = document.createElement("div");
        status.style.cssText = [
            "font:11px system-ui,-apple-system,Segoe UI,sans-serif",
            "opacity:.7",
            "padding-top:4px"
        ].join(";");

        wrap.appendChild(input);
        wrap.appendChild(status);

        const first = container.firstChild;
        if (first) container.insertBefore(wrap, first);
        else container.appendChild(wrap);

        function refreshItems() {
            items = candidateItems(container).filter(x => !wrap.contains(x));
        }

        function apply() {
            refreshItems();

            const q = normalize(input.value);
            let visible = 0;

            for (const item of items) {
                const label = normalize(itemLabel(item));
                const match = !q || label.includes(q);

                // Grid picker items are individual cells/menu items in current Blockly.
                item.style.display = match ? "" : "none";
                if (match) visible++;
            }

            status.textContent =
                visible.toLocaleString() +
                " / " +
                items.length.toLocaleString();
        }

        input.addEventListener("input", apply);

        // Keep the search field from closing the Blockly dropdown.
        for (const ev of ["mousedown", "pointerdown", "touchstart", "click"]) {
            wrap.addEventListener(ev, e => e.stopPropagation());
        }

        const mo = new MutationObserver(() => {
            if (!container.isConnected) {
                mo.disconnect();
                return;
            }
            apply();
        });

        mo.observe(container, {
            childList: true,
            subtree: true
        });

        apply();

        // Delay focus so Blockly finishes positioning the dropdown first.
        setTimeout(() => {
            try {
                input.focus({ preventScroll: true });
            } catch (_) {
                input.focus();
            }
        }, 30);

        console.info(
            "[MCFunction Searchable Grid POC] attached:",
            items.length,
            "options"
        );
    }

    function scan() {
        for (const dropdown of findDropdowns()) {
            attach(dropdown);
        }
    }

    const observer = new MutationObserver(scan);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "aria-hidden"]
    });

    setInterval(scan, 500);
    scan();

    console.info("[MCFunction Searchable Grid POC] injector ready");
})();
