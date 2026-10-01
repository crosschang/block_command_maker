/**
 * MakeCode Selector value wrapper
 *
 * Blockly/MakeCode UI에서 Selector를 값 블록으로 연결하기 위한 타입.
 * 실제 명령 의미는 내부 Selector AST가 보존한다.
 */

namespace MCFunctionFields {

    export enum SelectorNumberFilterType {
        X = 0,
        Y = 1,
        Z = 2,
        DX = 3,
        DY = 4,
        DZ = 5,
        RadiusMax = 6,
        RadiusMin = 7,
        LevelMax = 8,
        LevelMin = 9,
        RotationXMax = 10,
        RotationXMin = 11,
        RotationYMax = 12,
        RotationYMin = 13,
        Count = 14
    }

    //% blockId=mcfunction_selector_number_filter
    //% block="선택자 $selector 숫자 조건 $filterType 값 $value"
    //% selector.shadow="mcfunction_selector_all_players"
    //% value.defl=0
    export function addNumberFilter(
        selector: SelectorValue,
        filterType: SelectorNumberFilterType,
        value: number
    ): SelectorValue {

        let key = "";

        switch (filterType) {
            case SelectorNumberFilterType.X:
                key = "x";
                break;

            case SelectorNumberFilterType.Y:
                key = "y";
                break;

            case SelectorNumberFilterType.Z:
                key = "z";
                break;

            case SelectorNumberFilterType.DX:
                key = "dx";
                break;

            case SelectorNumberFilterType.DY:
                key = "dy";
                break;

            case SelectorNumberFilterType.DZ:
                key = "dz";
                break;

            case SelectorNumberFilterType.RadiusMax:
                key = "r";
                break;

            case SelectorNumberFilterType.RadiusMin:
                key = "rm";
                break;

            case SelectorNumberFilterType.LevelMax:
                key = "l";
                break;

            case SelectorNumberFilterType.LevelMin:
                key = "lm";
                break;

            case SelectorNumberFilterType.RotationXMax:
                key = "rx";
                break;

            case SelectorNumberFilterType.RotationXMin:
                key = "rxm";
                break;

            case SelectorNumberFilterType.RotationYMax:
                key = "ry";
                break;

            case SelectorNumberFilterType.RotationYMin:
                key = "rym";
                break;

            case SelectorNumberFilterType.Count:
                key = "c";
                break;
        }

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter(
                key,
                "" + value,
                false
            )
        );

        return selector;
    }

    //% blockId=mcfunction_selector_position_filter
    //% block="선택자 $selector 위치 X $x Y $y Z $z"
    //% selector.shadow="mcfunction_selector_all_players"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    export function addPositionFilter(
        selector: SelectorValue,
        x: number,
        y: number,
        z: number
    ): SelectorValue {

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter("x", "" + x, false)
        );

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter("y", "" + y, false)
        );

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter("z", "" + z, false)
        );

        return selector;
    }

    //% blockId=mcfunction_selector_area_filter
    //% block="선택자 $selector 영역 X $x Y $y Z $z dX $dx dY $dy dZ $dz"
    //% selector.shadow="mcfunction_selector_all_players"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    //% dx.defl=0
    //% dy.defl=0
    //% dz.defl=0
    export function addAreaFilter(
        selector: SelectorValue,
        x: number,
        y: number,
        z: number,
        dx: number,
        dy: number,
        dz: number
    ): SelectorValue {

        let keys = ["x", "y", "z", "dx", "dy", "dz"];
        let values = [x, y, z, dx, dy, dz];

        for (let i = 0; i < keys.length; i++) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    keys[i],
                    "" + values[i],
                    false
                )
            );
        }

        return selector;
    }

    //% blockId=mcfunction_selector_distance_filter
    //% block="선택자 $selector 거리 $range"
    //% selector.shadow="mcfunction_selector_all_players"
    //% range.shadow="mcfunction_range_min_max"
    export function addDistanceFilter(
        selector: SelectorValue,
        range: RangeValue
    ): SelectorValue {

        if (range.range.hasMin) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "rm",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "r",
                    "" + range.range.max,
                    false
                )
            );
        }

        return selector;
    }

    //% blockId=mcfunction_selector_level_filter
    //% block="선택자 $selector 레벨 $range"
    //% selector.shadow="mcfunction_selector_all_players"
    //% range.shadow="mcfunction_range_min_max"
    export function addLevelFilter(
        selector: SelectorValue,
        range: RangeValue
    ): SelectorValue {

        if (range.range.hasMin) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "lm",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "l",
                    "" + range.range.max,
                    false
                )
            );
        }

        return selector;
    }

    //% blockId=mcfunction_selector_rotation_x_filter
    //% block="선택자 $selector X 회전 $range"
    //% selector.shadow="mcfunction_selector_all_players"
    //% range.shadow="mcfunction_range_min_max"
    export function addRotationXFilter(
        selector: SelectorValue,
        range: RangeValue
    ): SelectorValue {

        if (range.range.hasMin) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "rxm",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "rx",
                    "" + range.range.max,
                    false
                )
            );
        }

        return selector;
    }

    //% blockId=mcfunction_selector_rotation_y_filter
    //% block="선택자 $selector Y 회전 $range"
    //% selector.shadow="mcfunction_selector_all_players"
    //% range.shadow="mcfunction_range_min_max"
    export function addRotationYFilter(
        selector: SelectorValue,
        range: RangeValue
    ): SelectorValue {

        if (range.range.hasMin) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "rym",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            MCFunctionAST.addSelectorFilter(
                selector.selector,
                MCFunctionAST.createSelectorFilter(
                    "ry",
                    "" + range.range.max,
                    false
                )
            );
        }

        return selector;
    }

    //% blockId=mcfunction_selector_score_filter
    //% block="선택자 $selector 스코어 목표 $objective 범위 $range"
    //% selector.shadow="mcfunction_selector_all_players"
    //% objective.defl="money"
    //% range.shadow="mcfunction_range_min_max"
    export function addScoreFilter(
        selector: SelectorValue,
        objective: string,
        range: RangeValue
    ): SelectorValue {

        MCFunctionAST.addSelectorScoreCondition(
            selector.selector,
            MCFunctionAST.createSelectorScoreCondition(
                objective,
                range.range,
                false
            )
        );

        return selector;
    }

    export class SelectorValue {
        selector: MCFunctionAST.Selector;

        constructor(selector: MCFunctionAST.Selector) {
            this.selector = selector;
        }
    }

    //% blockId=mcfunction_selector_all_players
    //% block="모든 플레이어 @a"
    export function allPlayers(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllPlayers
            )
        );
    }

    //% blockId=mcfunction_selector_all_entities
    //% block="모든 엔티티 @e"
    export function allEntities(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllEntities
            )
        );
    }

    //% blockId=mcfunction_selector_nearest_player
    //% block="가장 가까운 플레이어 @p"
    export function nearestPlayer(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.NearestPlayer
            )
        );
    }

    //% blockId=mcfunction_selector_random_player
    //% block="무작위 플레이어 @r"
    export function randomPlayer(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.RandomPlayer
            )
        );
    }

    //% blockId=mcfunction_selector_self
    //% block="자신 @s"
    export function self(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.Self
            )
        );
    }

    //% blockId=mcfunction_selector_initiator
    //% block="대화 시작 플레이어 @initiator"
    export function initiator(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.Initiator
            )
        );
    }
}