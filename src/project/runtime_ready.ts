namespace MCFunctionRuntime {
    export function showReady(): void {
        loops.runInBackground(function () {
            loops.pause(0)
            player.say("MCFunction 테스트 준비완료")
        })
    }
}

MCFunctionRuntime.showReady()