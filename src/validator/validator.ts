namespace MCFunctionValidator {

    export enum ValidationLevel {
        Error = 0,
        Warning = 1,
        Info = 2
    }

    export interface ValidationIssue {
        level: ValidationLevel;
        code: string;
        message: string;
    }

    function addIssue(
        issues: ValidationIssue[],
        level: ValidationLevel,
        code: string,
        message: string
    ): void {

        issues.push({
            level: level,
            code: code,
            message: message
        });
    }

    function countFilter(
        selector: MCFunctionAST.Selector,
        key: string
    ): number {

        let count = 0;

        for (
            let i = 0;
            i < selector.filters.length;
            i++
        ) {
            if (selector.filters[i].key == key) {
                count++;
            }
        }

        return count;
    }

    function countPositiveFilter(
        selector: MCFunctionAST.Selector,
        key: string
    ): number {

        let count = 0;

        for (
            let i = 0;
            i < selector.filters.length;
            i++
        ) {

            let filter =
                selector.filters[i];

            if (
                filter.key == key &&
                !filter.inverted
            ) {
                count++;
            }
        }

        return count;
    }

    function validateSingleFilter(
        selector: MCFunctionAST.Selector,
        key: string,
        label: string,
        issues: ValidationIssue[]
    ): void {

        if (countFilter(selector, key) > 1) {

            addIssue(
                issues,
                ValidationLevel.Error,
                "SELECTOR_DUPLICATE_" + key,
                label + " 조건은 한 번만 사용할 수 있습니다."
            );
        }
    }

    export function validateSelector(
        selector: MCFunctionAST.Selector
    ): ValidationIssue[] {

        let issues: ValidationIssue[] = [];

        // 한 번만 사용할 수 있는 Selector parameter
        validateSingleFilter(selector, "x", "X", issues);
        validateSingleFilter(selector, "y", "Y", issues);
        validateSingleFilter(selector, "z", "Z", issues);

        validateSingleFilter(selector, "dx", "dX", issues);
        validateSingleFilter(selector, "dy", "dY", issues);
        validateSingleFilter(selector, "dz", "dZ", issues);

        validateSingleFilter(selector, "r", "최대 거리", issues);
        validateSingleFilter(selector, "rm", "최소 거리", issues);

        validateSingleFilter(selector, "c", "대상 수", issues);
        validateSingleFilter(selector, "m", "게임모드", issues);

        validateSingleFilter(selector, "l", "최대 레벨", issues);
        validateSingleFilter(selector, "lm", "최소 레벨", issues);

        validateSingleFilter(selector, "rx", "X 회전 최대", issues);
        validateSingleFilter(selector, "rxm", "X 회전 최소", issues);

        validateSingleFilter(selector, "ry", "Y 회전 최대", issues);
        validateSingleFilter(selector, "rym", "Y 회전 최소", issues);

        // @initiator는 Dialogue 전용 특수 Selector이며
        // Selector 조건을 사용하지 않는다.
        if (
            selector.base ==
            MCFunctionAST.SelectorBase.Initiator
        ) {

            if (
                selector.filters.length > 0 ||
                selector.scores.length > 0 ||
                selector.hasItems.length > 0
            ) {

                addIssue(
                    issues,
                    ValidationLevel.Error,
                    "SELECTOR_INITIATOR_CONDITION",
                    "@initiator에는 선택자 조건을 사용할 수 없습니다."
                );
            }
        }


        // type은 @a / @p에서 사용할 수 없음
        if (
            countFilter(selector, "type") > 0 &&
            (
                selector.base ==
                MCFunctionAST.SelectorBase.AllPlayers ||

                selector.base ==
                MCFunctionAST.SelectorBase.NearestPlayer
            )
        ) {

            addIssue(
                issues,
                ValidationLevel.Error,
                "SELECTOR_TYPE_BASE",
                "type 조건은 @a 또는 @p에서 사용할 수 없습니다."
            );
        }


        // type 여러 개 사용 시 모두 부정 조건이어야 함
        if (
            countFilter(selector, "type") > 1 &&
            countPositiveFilter(selector, "type") > 0
        ) {

            addIssue(
                issues,
                ValidationLevel.Error,
                "SELECTOR_TYPE_MULTIPLE",
                "type 조건을 여러 번 사용할 때는 부정 조건만 사용할 수 있습니다."
            );
        }


        // name 여러 개 사용 시 모두 부정 조건이어야 함
        if (
            countFilter(selector, "name") > 1 &&
            countPositiveFilter(selector, "name") > 0
        ) {

            addIssue(
                issues,
                ValidationLevel.Error,
                "SELECTOR_NAME_MULTIPLE",
                "name 조건을 여러 번 사용할 때는 부정 조건만 사용할 수 있습니다."
            );
        }


        // 같은 scoreboard objective 중복 검사
        for (
            let i = 0;
            i < selector.scores.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < selector.scores.length;
                j++
            ) {

                if (
                    selector.scores[i].objective ==
                    selector.scores[j].objective
                ) {

                    addIssue(
                        issues,
                        ValidationLevel.Error,
                        "SELECTOR_SCORE_DUPLICATE",
                        "같은 scoreboard objective를 중복 사용할 수 없습니다."
                    );
                }
            }
        }


        // 현재 V1 Compiler는 hasitem 하나만 지원
        if (selector.hasItems.length > 1) {

            addIssue(
                issues,
                ValidationLevel.Error,
                "SELECTOR_HASITEM_V1_LIMIT",
                "현재 V1에서는 hasitem 조건을 하나만 사용할 수 있습니다."
            );
        }

        return issues;
    }


    function appendIssues(
        target: ValidationIssue[],
        source: ValidationIssue[]
    ): void {

        for (let i = 0; i < source.length; i++) {
            target.push(source[i]);
        }
    }

    function isIntegerValue(value: number): boolean {
        return Math.floor(value) == value;
    }

    /**
     * Command token으로 안전하게 직렬화할 수 있는 ID인지 확인한다.
     *
     * Custom Namespace는 허용하므로 Registry 존재 여부와 문법 안전성은
     * 서로 다른 단계로 검증한다.
     */
    function isSafeIdToken(value: string): boolean {

        if (!value || value.length == 0) {
            return false;
        }

        for (let i = 0; i < value.length; i++) {
            let ch = value.charAt(i);

            if (
                ch == " " ||
                ch == "\t" ||
                ch == "\r" ||
                ch == "\n" ||
                ch == "\"" ||
                ch == "\\" ||
                ch == "{" ||
                ch == "}" ||
                ch == "[" ||
                ch == "]"
            ) {
                return false;
            }
        }

        return true;
    }

    function containsString(
        values: string[],
        value: string,
        endExclusive: number
    ): boolean {

        for (let i = 0; i < endExclusive; i++) {
            if (values[i] == value) {
                return true;
            }
        }

        return false;
    }

    export function validateItemStack(
        item: MCFunctionAST.ItemStack
    ): ValidationIssue[] {

        let issues: ValidationIssue[] = [];

        if (!isSafeIdToken(item.id)) {
            addIssue(
                issues,
                ValidationLevel.Error,
                "ITEM_ID_INVALID",
                "아이템 ID가 비어 있거나 명령에 사용할 수 없는 문자를 포함합니다."
            );
        } else if (!MCFunctionRegistryBedrock.isKnownItem(item.id)) {
            addIssue(
                issues,
                ValidationLevel.Warning,
                "ITEM_ID_CUSTOM",
                "Registry에 없는 아이템 ID입니다. Custom Namespace 또는 버전 차이인지 확인하세요: " + item.id
            );
        }

        if (!isIntegerValue(item.amount)) {
            addIssue(
                issues,
                ValidationLevel.Error,
                "ITEM_AMOUNT_NOT_INTEGER",
                "아이템 개수는 정수여야 합니다."
            );
        } else if (item.amount <= 0) {
            addIssue(
                issues,
                ValidationLevel.Error,
                "ITEM_AMOUNT_NON_POSITIVE",
                "아이템 개수는 1 이상이어야 합니다."
            );
        }

        if (!isIntegerValue(item.data)) {
            addIssue(
                issues,
                ValidationLevel.Error,
                "ITEM_DATA_NOT_INTEGER",
                "아이템 data 값은 정수여야 합니다."
            );
        }

        for (let i = 0; i < item.components.canDestroy.length; i++) {
            let blockId = item.components.canDestroy[i];

            if (!isSafeIdToken(blockId)) {
                addIssue(
                    issues,
                    ValidationLevel.Error,
                    "ITEM_CAN_DESTROY_ID_INVALID",
                    "can_destroy 블록 ID가 올바르지 않습니다: " + blockId
                );
            } else if (!MCFunctionRegistryBedrock.isKnownBlock(blockId)) {
                addIssue(
                    issues,
                    ValidationLevel.Warning,
                    "ITEM_CAN_DESTROY_CUSTOM_BLOCK",
                    "Registry에 없는 can_destroy 블록 ID입니다: " + blockId
                );
            }

            if (containsString(item.components.canDestroy, blockId, i)) {
                addIssue(
                    issues,
                    ValidationLevel.Warning,
                    "ITEM_CAN_DESTROY_DUPLICATE",
                    "can_destroy에 같은 블록이 중복되어 있습니다: " + blockId
                );
            }
        }

        for (let i = 0; i < item.components.canPlaceOn.length; i++) {
            let blockId = item.components.canPlaceOn[i];

            if (!isSafeIdToken(blockId)) {
                addIssue(
                    issues,
                    ValidationLevel.Error,
                    "ITEM_CAN_PLACE_ON_ID_INVALID",
                    "can_place_on 블록 ID가 올바르지 않습니다: " + blockId
                );
            } else if (!MCFunctionRegistryBedrock.isKnownBlock(blockId)) {
                addIssue(
                    issues,
                    ValidationLevel.Warning,
                    "ITEM_CAN_PLACE_ON_CUSTOM_BLOCK",
                    "Registry에 없는 can_place_on 블록 ID입니다: " + blockId
                );
            }

            if (containsString(item.components.canPlaceOn, blockId, i)) {
                addIssue(
                    issues,
                    ValidationLevel.Warning,
                    "ITEM_CAN_PLACE_ON_DUPLICATE",
                    "can_place_on에 같은 블록이 중복되어 있습니다: " + blockId
                );
            }
        }

        if (
            item.components.itemLock != MCFunctionAST.ItemLockMode.None &&
            item.components.itemLock != MCFunctionAST.ItemLockMode.LockInInventory &&
            item.components.itemLock != MCFunctionAST.ItemLockMode.LockInSlot
        ) {
            addIssue(
                issues,
                ValidationLevel.Error,
                "ITEM_LOCK_MODE_INVALID",
                "지원하지 않는 item_lock 모드입니다."
            );
        }

        return issues;
    }

    export function validateGiveCommand(
        command: MCFunctionAST.GiveCommand
    ): ValidationIssue[] {

        let issues: ValidationIssue[] = [];

        appendIssues(
            issues,
            validateSelector(command.target)
        );

        appendIssues(
            issues,
            validateItemStack(command.item)
        );

        return issues;
    }

    export function validateCommand(
        command: MCFunctionAST.CommandNode
    ): ValidationIssue[] {

        if (command.kind == MCFunctionAST.CommandKind.Give) {
            return validateGiveCommand(
                <MCFunctionAST.GiveCommand>command
            );
        }

        return [];
    }

    export function hasErrors(
        issues: ValidationIssue[]
    ): boolean {

        for (let i = 0; i < issues.length; i++) {
            if (issues[i].level == ValidationLevel.Error) {
                return true;
            }
        }

        return false;
    }

    export function firstErrorMessage(
        issues: ValidationIssue[]
    ): string {

        for (let i = 0; i < issues.length; i++) {
            if (issues[i].level == ValidationLevel.Error) {
                return issues[i].message;
            }
        }

        return "알 수 없는 검증 오류";
    }

}