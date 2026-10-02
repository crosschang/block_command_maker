/**
 * Entity value library
 *
 * Visible MakeCode blocks live here.
 * Core value type stays MCFunctionFields.EntityValue.
 */

//% color="#2E8B57" weight=89 icon="\uf1b0" block="MCFunction Entity"
//% groups='["Selection & Input", "Registry"]'
namespace MCFunctionEntityLibrary {

    //% group="Selection & Input"
    //% weight=100
    //% blockId=mcfunction_entity_select
    //% block="entity select $preset"
    export function select(
        preset: MCFunctionFields.EntityPreset
    ): MCFunctionFields.EntityValue {

        return MCFunctionFields.entitySelect(preset);
    }

    //% group="Selection & Input"
    //% weight=99
    //% blockId=mcfunction_entity
    //% block="entity custom id $entityId"
    //% entityId.defl="minecraft:zombie"
    export function custom(
        entityId: string
    ): MCFunctionFields.EntityValue {

        return MCFunctionFields.entity(entityId);
    }
}
