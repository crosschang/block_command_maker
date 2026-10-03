/**
 * Development/runtime readiness marker.
 *
 * The workspace template inserts this block into the MakeCode "on start"
 * block so the user has a visible readiness marker without adding it by hand.
 *
 * The editor block label is localized through _locales/ko.
 * The in-game message is intentionally bilingual because MakeCode extension
 * editor localization is not exposed as a reliable runtime locale value.
 */
namespace MCFunctionRuntime {

    //% blockId=mcfunction_runtime_ready
    //% block="show MCFunction test ready"
    //% blockHidden=true
    export function ready(): void {
        player.say("MCFunction READY / \uD14C\uC2A4\uD2B8 \uC900\uBE44\uC644\uB8CC");
    }
}
