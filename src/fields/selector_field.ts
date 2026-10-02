/**
 * MakeCode Selector value wrapper
 *
 * Blockly/MakeCode UI에서 Selector를 값 블록으로 연결하기 위한 타입.
 * 실제 명령 의미는 내부 Selector AST가 보존한다.
 */

//% groups='["선택자 기본", "선택자 상세", "others"]'
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

    //% group="선택자 상세"
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
    // Selector 기본 대상 조건
    // type / name / tag는 @e를 포함한 실사용 Selector에서 자주 사용한다.
    // 실제 의미는 SelectorFilter AST에 저장한다.
    // ---------------------------------------------------------------------

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_type_filter
    //% block="선택자 $selector 종류 type $typeId 제외 $exclude"
    //% selector.shadow="mcfunction_selector_all_entities"
    //% typeId.defl="minecraft:zombie"
    //% exclude.defl=false
    export function addTypeFilter(
        selector: SelectorValue,
        typeId: string,
        exclude: boolean
    ): SelectorValue {

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter(
                "type",
                typeId,
                exclude
            )
        );

        return selector;
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_name_filter
    //% block="선택자 $selector 이름 name $name 제외 $exclude"
    //% selector.shadow="mcfunction_selector_all_entities"
    //% name.defl="Boss"
    //% exclude.defl=false
    export function addNameFilter(
        selector: SelectorValue,
        name: string,
        exclude: boolean
    ): SelectorValue {

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter(
                "name",
                name,
                exclude
            )
        );

        return selector;
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_tag_filter
    //% block="선택자 $selector 태그 tag $tag 제외 $exclude"
    //% selector.shadow="mcfunction_selector_all_entities"
    //% tag.defl="boss"
    //% exclude.defl=false
    export function addTagFilter(
        selector: SelectorValue,
        tag: string,
        exclude: boolean
    ): SelectorValue {

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter(
                "tag",
                tag,
                exclude
            )
        );

        return selector;
    }

    // ---------------------------------------------------------------------
    // Selector 상세 대상 조건
    // family / gamemode는 같은 Selector AST를 사용하되 UI에서 상세 그룹에 둔다.
    // ---------------------------------------------------------------------

    //% group="선택자 상세"
    //% blockId=mcfunction_selector_family_filter
    //% block="선택자 $selector 패밀리 family $family 제외 $exclude"
    //% selector.shadow="mcfunction_selector_all_entities"
    //% family.defl="monster"
    //% exclude.defl=false
    export function addFamilyFilter(
        selector: SelectorValue,
        family: string,
        exclude: boolean
    ): SelectorValue {

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter(
                "family",
                family,
                exclude
            )
        );

        return selector;
    }

    //% group="선택자 상세"
    //% blockId=mcfunction_selector_gamemode_filter
    //% block="선택자 $selector 게임모드 $gamemode 제외 $exclude"
    //% selector.shadow="mcfunction_selector_all_players"
    //% gamemode.defl="survival"
    //% exclude.defl=false
    export function addGameModeFilter(
        selector: SelectorValue,
        gamemode: string,
        exclude: boolean
    ): SelectorValue {

        MCFunctionAST.addSelectorFilter(
            selector.selector,
            MCFunctionAST.createSelectorFilter(
                "m",
                gamemode,
                exclude
            )
        );

        return selector;
    }

    //% group="선택자 상세"
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

    //% group="선택자 상세"
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

    //% group="선택자 상세"
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

    //% group="선택자 상세"
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

    //% group="선택자 상세"
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

    //% group="선택자 상세"
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

    //% group="선택자 상세"
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

    //% group="선택자 상세"
    //% blockId=mcfunction_selector_hasitem_filter
    //% block="선택자 $selector 아이템 보유 $item 개수 $quantity"
    //% selector.shadow="mcfunction_selector_all_players"
    //% item.shadow="mcfunction_item"
    //% quantity.shadow="mcfunction_range_min"
    export function addHasItemFilter(
        selector: SelectorValue,
        item: ItemValue,
        quantity: RangeValue
    ): SelectorValue {

        MCFunctionAST.addSelectorHasItemCondition(
            selector.selector,
            MCFunctionAST.createSelectorHasItemCondition(
                item.itemId,
                quantity.range
            )
        );

        return selector;
    }

    //% group="선택자 상세"
    //% blockId=mcfunction_selector_hasitem_advanced
    //% block="선택자 $selector 아이템 보유 상세 $item 개수 $quantity 위치 $location 슬롯 $slot 데이터 $data"
    //% selector.shadow="mcfunction_selector_all_players"
    //% item.shadow="mcfunction_item"
    //% quantity.shadow="mcfunction_range_min"
    //% slot.defl=0
    //% data.defl=0
    export function addHasItemAdvancedFilter(
        selector: SelectorValue,
        item: ItemValue,
        quantity: RangeValue,
        location: HasItemLocation,
        slot: number,
        data: number
    ): SelectorValue {

        let slotRange =
            MCFunctionAST.createMinMaxRange(
                slot,
                slot
            );

        let condition =
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

        MCFunctionAST.addSelectorHasItemCondition(
            selector.selector,
            condition
        );

        return selector;
    }

    export class SelectorValue {
        selector: MCFunctionAST.Selector;

        constructor(selector: MCFunctionAST.Selector) {
            this.selector = selector;
        }
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_all_players
    //% block="모든 플레이어 @a"
    export function allPlayers(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllPlayers
            )
        );
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_all_entities
    //% block="모든 엔티티 @e"
    export function allEntities(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllEntities
            )
        );
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_nearest_player
    //% block="가장 가까운 플레이어 @p"
    export function nearestPlayer(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.NearestPlayer
            )
        );
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_random_player
    //% block="무작위 플레이어 @r"
    export function randomPlayer(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.RandomPlayer
            )
        );
    }

    //% group="선택자 기본"
    //% blockId=mcfunction_selector_self
    //% block="자신 @s"
    export function self(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.Self
            )
        );
    }

    //% group="선택자 기본"
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