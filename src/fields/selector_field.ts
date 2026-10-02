/**
 * MakeCode Selector value wrapper
 *
 * Blockly/MakeCode UI에서 Selector를 값 블록으로 연결하기 위한 타입.
 * 실제 명령 의미는 내부 Selector AST가 보존한다.
 */

//% color="#6A5ACD" weight=90 icon="\uf1b2" block="MCFunction"
//% groups='["선택자 대상", "선택자 조건", "아이템", "아이템 상세", "공통 값", "others"]'
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

    export enum HasItemLocation {
        MainHand = 0,
        OffHand = 1,

        Head = 2,
        Chest = 3,
        Legs = 4,
        Feet = 5,

        Hotbar = 6,
        Inventory = 7,
        EnderChest = 8
    }

    function toSlotLocation(
        location: HasItemLocation
    ): MCFunctionAST.SlotLocation {

        switch (location) {

            case HasItemLocation.MainHand:
                return MCFunctionAST.SlotLocation.WeaponMainhand;

            case HasItemLocation.OffHand:
                return MCFunctionAST.SlotLocation.WeaponOffhand;

            case HasItemLocation.Head:
                return MCFunctionAST.SlotLocation.ArmorHead;

            case HasItemLocation.Chest:
                return MCFunctionAST.SlotLocation.ArmorChest;

            case HasItemLocation.Legs:
                return MCFunctionAST.SlotLocation.ArmorLegs;

            case HasItemLocation.Feet:
                return MCFunctionAST.SlotLocation.ArmorFeet;

            case HasItemLocation.Hotbar:
                return MCFunctionAST.SlotLocation.Hotbar;

            case HasItemLocation.Inventory:
                return MCFunctionAST.SlotLocation.Inventory;

            case HasItemLocation.EnderChest:
                return MCFunctionAST.SlotLocation.EnderChest;

            default:
                return MCFunctionAST.SlotLocation.Inventory;
        }
    }

    // ---------------------------------------------------------------------
    // Selector Condition Chain
    //
    // MakeCode UI에서는 조건들을 다음(next)으로 이어 붙이고,
    // Block Adapter가 최종 Selector AST에 적용한다.
    // ---------------------------------------------------------------------

    export class SelectorConditionValue {

        filters: MCFunctionAST.SelectorFilter[];
        scores: MCFunctionAST.SelectorScoreCondition[];
        hasItems: MCFunctionAST.SelectorHasItemCondition[];

        next: SelectorConditionValue;
        isEnd: boolean;

        constructor() {
            this.filters = [];
            this.scores = [];
            this.hasItems = [];

            // PXT 호환을 위해 null/undefined 대신 자기 자신을 기본값으로 둔다.
            // 실제 조건 생성 함수에서는 반드시 next를 덮어쓴다.
            this.next = this;
            this.isEnd = false;
        }
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_no_condition
    //% block="추가 조건 없음"
    export function noSelectorCondition(
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.isEnd = true;

        return condition;
    }

    function applySelectorConditions(
        selector: MCFunctionAST.Selector,
        condition: SelectorConditionValue
    ): void {

        let current = condition;

        while (!current.isEnd) {

            // 일반 Selector Filter
            for (
                let i = 0;
                i < current.filters.length;
                i++
            ) {

                let filter = current.filters[i];

                // 반복 가능한 조건
                if (
                    filter.key == "tag" ||
                    filter.key == "family" ||
                    filter.key == "type" ||
                    filter.key == "name"
                ) {

                    MCFunctionAST.addSelectorFilter(
                        selector,
                        filter
                    );

                } else {

                    // x, r, m, l, rx 등 단일 조건
                    MCFunctionAST.setSelectorFilter(
                        selector,
                        filter
                    );
                }
            }

            // Scores: objective별로 하나만 유지
            for (
                let i = 0;
                i < current.scores.length;
                i++
            ) {

                MCFunctionAST.setSelectorScoreCondition(
                    selector,
                    current.scores[i]
                );
            }

            // HasItem: 현재 V1에서는 하나만 유지
            for (
                let i = 0;
                i < current.hasItems.length;
                i++
            ) {

                MCFunctionAST.setSelectorHasItemCondition(
                    selector,
                    current.hasItems[i]
                );
            }

            current = current.next;
        }
    }

    // ---------------------------------------------------------------------
    // Selector 조건 블록
    // ---------------------------------------------------------------------

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_type_filter
    //% block="종류 type $typeId 제외 $exclude 다음 $next"
    //% typeId.defl="minecraft:zombie"
    //% exclude.defl=false
    //% next.shadow="mcfunction_selector_no_condition"
    export function addTypeFilter(
        typeId: string,
        exclude: boolean,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "type",
                typeId,
                exclude
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_name_filter
    //% block="이름 name $name 제외 $exclude 다음 $next"
    //% name.defl="Boss"
    //% exclude.defl=false
    //% next.shadow="mcfunction_selector_no_condition"
    export function addNameFilter(
        name: string,
        exclude: boolean,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "name",
                name,
                exclude
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_tag_filter
    //% block="태그 tag $tag 제외 $exclude 다음 $next"
    //% tag.defl="boss"
    //% exclude.defl=false
    //% next.shadow="mcfunction_selector_no_condition"
    export function addTagFilter(
        tag: string,
        exclude: boolean,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "tag",
                tag,
                exclude
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_family_filter
    //% block="패밀리 family $family 제외 $exclude 다음 $next"
    //% family.defl="monster"
    //% exclude.defl=false
    //% next.shadow="mcfunction_selector_no_condition"
    export function addFamilyFilter(
        family: string,
        exclude: boolean,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "family",
                family,
                exclude
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_gamemode_filter
    //% block="게임모드 $gamemode 제외 $exclude 다음 $next"
    //% gamemode.defl="survival"
    //% exclude.defl=false
    //% next.shadow="mcfunction_selector_no_condition"
    export function addGameModeFilter(
        gamemode: string,
        exclude: boolean,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "m",
                gamemode,
                exclude
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_number_filter
    //% block="$filterType 값 $value 다음 $next"
    //% value.defl=0
    //% next.shadow="mcfunction_selector_no_condition"
    export function addNumberFilter(
        filterType: SelectorNumberFilterType,
        value: number,
        next: SelectorConditionValue
    ): SelectorConditionValue {

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

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                key,
                "" + value,
                false
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_position_filter
    //% block="위치 X $x Y $y Z $z 다음 $next"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    //% next.shadow="mcfunction_selector_no_condition"
    export function addPositionFilter(
        x: number,
        y: number,
        z: number,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "x",
                "" + x,
                false
            )
        );

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "y",
                "" + y,
                false
            )
        );

        condition.filters.push(
            MCFunctionAST.createSelectorFilter(
                "z",
                "" + z,
                false
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_area_filter
    //% block="영역 X $x Y $y Z $z dX $dx dY $dy dZ $dz 다음 $next"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    //% dx.defl=0
    //% dy.defl=0
    //% dz.defl=0
    //% next.shadow="mcfunction_selector_no_condition"
    export function addAreaFilter(
        x: number,
        y: number,
        z: number,
        dx: number,
        dy: number,
        dz: number,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        let keys = ["x", "y", "z", "dx", "dy", "dz"];
        let values = [x, y, z, dx, dy, dz];

        for (let i = 0; i < keys.length; i++) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    keys[i],
                    "" + values[i],
                    false
                )
            );
        }

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_distance_filter
    //% block="거리 $range 다음 $next"
    //% range.shadow="mcfunction_range_min_max"
    //% next.shadow="mcfunction_selector_no_condition"
    export function addDistanceFilter(
        range: RangeValue,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        if (range.range.hasMin) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "rm",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "r",
                    "" + range.range.max,
                    false
                )
            );
        }

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_level_filter
    //% block="레벨 $range 다음 $next"
    //% range.shadow="mcfunction_range_min_max"
    //% next.shadow="mcfunction_selector_no_condition"
    export function addLevelFilter(
        range: RangeValue,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        if (range.range.hasMin) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "lm",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "l",
                    "" + range.range.max,
                    false
                )
            );
        }

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_rotation_x_filter
    //% block="X 회전 $range 다음 $next"
    //% range.shadow="mcfunction_range_min_max"
    //% next.shadow="mcfunction_selector_no_condition"
    export function addRotationXFilter(
        range: RangeValue,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        if (range.range.hasMin) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "rxm",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "rx",
                    "" + range.range.max,
                    false
                )
            );
        }

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_rotation_y_filter
    //% block="Y 회전 $range 다음 $next"
    //% range.shadow="mcfunction_range_min_max"
    //% next.shadow="mcfunction_selector_no_condition"
    export function addRotationYFilter(
        range: RangeValue,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        if (range.range.hasMin) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "rym",
                    "" + range.range.min,
                    false
                )
            );
        }

        if (range.range.hasMax) {
            condition.filters.push(
                MCFunctionAST.createSelectorFilter(
                    "ry",
                    "" + range.range.max,
                    false
                )
            );
        }

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_score_filter
    //% block="스코어 목표 $objective 범위 $range 다음 $next"
    //% objective.defl="money"
    //% range.shadow="mcfunction_range_min_max"
    //% next.shadow="mcfunction_selector_no_condition"
    export function addScoreFilter(
        objective: string,
        range: RangeValue,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.scores.push(
            MCFunctionAST.createSelectorScoreCondition(
                objective,
                range.range,
                false
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_hasitem_filter
    //% block="아이템 $item 개수 $quantity 보유 다음 $next"
    //% item.shadow="mcfunction_item"
    //% quantity.shadow="mcfunction_range_min"
    //% next.shadow="mcfunction_selector_no_condition"
    export function addHasItemFilter(
        item: ItemValue,
        quantity: RangeValue,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let condition =
            new SelectorConditionValue();

        condition.next = next;

        condition.hasItems.push(
            MCFunctionAST.createSelectorHasItemCondition(
                item.itemId,
                quantity.range
            )
        );

        return condition;
    }

    //% group="선택자 조건"
    //% blockId=mcfunction_selector_hasitem_advanced
    //% block="아이템 보유 상세 $item 개수 $quantity 위치 $location 슬롯 $slot 데이터 $data 다음 $next"
    //% item.shadow="mcfunction_item"
    //% quantity.shadow="mcfunction_range_min"
    //% slot.defl=0
    //% data.defl=0
    //% next.shadow="mcfunction_selector_no_condition"
    export function addHasItemAdvancedFilter(
        item: ItemValue,
        quantity: RangeValue,
        location: HasItemLocation,
        slot: number,
        data: number,
        next: SelectorConditionValue
    ): SelectorConditionValue {

        let slotRange =
            MCFunctionAST.createMinMaxRange(
                slot,
                slot
            );

        let hasItem =
            MCFunctionAST.createSelectorHasItemAdvancedCondition(
                item.itemId,
                quantity.range,

                true,
                toSlotLocation(location),

                true,
                slotRange,

                true,
                data
            );

        let condition =
            new SelectorConditionValue();

        condition.next = next;
        condition.hasItems.push(hasItem);

        return condition;
    }

    // ---------------------------------------------------------------------
    // Selector Value
    // ---------------------------------------------------------------------

    export class SelectorValue {
        selector: MCFunctionAST.Selector;

        constructor(selector: MCFunctionAST.Selector) {
            this.selector = selector;
        }
    }

    // ---------------------------------------------------------------------
    // Selector 대상
    //
    // @a, @e, @p, @r, @s → 조건 체인 사용 가능
    // @initiator            → Dialogue 전용, 조건 사용 불가
    // ---------------------------------------------------------------------

    //% group="선택자 대상"
    //% blockId=mcfunction_selector_all_players
    //% block="모든 플레이어 @a 조건 $conditions"
    //% conditions.shadow="mcfunction_selector_no_condition"
    export function allPlayers(
        conditions: SelectorConditionValue
    ): SelectorValue {

        let selector =
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllPlayers
            );

        applySelectorConditions(
            selector,
            conditions
        );

        return new SelectorValue(
            selector
        );
    }

    //% group="선택자 대상"
    //% blockId=mcfunction_selector_all_entities
    //% block="모든 엔티티 @e 조건 $conditions"
    //% conditions.shadow="mcfunction_selector_no_condition"
    export function allEntities(
        conditions: SelectorConditionValue
    ): SelectorValue {

        let selector =
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllEntities
            );

        applySelectorConditions(
            selector,
            conditions
        );

        return new SelectorValue(
            selector
        );
    }

    //% group="선택자 대상"
    //% blockId=mcfunction_selector_nearest_player
    //% block="가장 가까운 플레이어 @p 조건 $conditions"
    //% conditions.shadow="mcfunction_selector_no_condition"
    export function nearestPlayer(
        conditions: SelectorConditionValue
    ): SelectorValue {

        let selector =
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.NearestPlayer
            );

        applySelectorConditions(
            selector,
            conditions
        );

        return new SelectorValue(
            selector
        );
    }

    //% group="선택자 대상"
    //% blockId=mcfunction_selector_random_player
    //% block="무작위 플레이어 @r 조건 $conditions"
    //% conditions.shadow="mcfunction_selector_no_condition"
    export function randomPlayer(
        conditions: SelectorConditionValue
    ): SelectorValue {

        let selector =
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.RandomPlayer
            );

        applySelectorConditions(
            selector,
            conditions
        );

        return new SelectorValue(
            selector
        );
    }

    //% group="선택자 대상"
    //% blockId=mcfunction_selector_self
    //% block="자신 @s 조건 $conditions"
    //% conditions.shadow="mcfunction_selector_no_condition"
    export function self(
        conditions: SelectorConditionValue
    ): SelectorValue {

        let selector =
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.Self
            );

        applySelectorConditions(
            selector,
            conditions
        );

        return new SelectorValue(
            selector
        );
    }

    //% group="선택자 대상"
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
