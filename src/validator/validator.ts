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
}