/**
 * Custom item PNG asset POC
 *
 * Goal:
 * - Prove that a normal Minecraft MakeCode GitHub Extension can render an
 *   extension-owned PNG inside a reporter block without using minecraftItem.
 * - Prove that the same rendered image survives Toolbox Search.
 *
 * Architecture under test:
 *   PNG -> data URI -> built-in gridpicker image option -> shadow field
 *       -> ItemValue reporter block
 *
 * The visual parameter is ignored intentionally. Command meaning remains the
 * fixed ItemValue string, so this POC does not alter AST/Compiler semantics.
 */

//% color="#C98900" weight=87 icon="\uf06b" block="MCFunction Custom Asset POC"
namespace MCFunctionItemCustomAssetPOC {

    // Hidden image field: synthetic copper spear PNG owned by this extension.
    //% blockId=mcfunction_custom_asset_copper_spear_field
    //% block="$asset"
    //% blockHidden=true
    //% asset.fieldEditor="gridpicker"
    //% asset.fieldOptions.columns=1
    //% asset.fieldOptions.decompileLiterals=true
    //% asset.fieldOptions.data='[[{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsElEQVR4nGNgGAUDAS4Ve/yHsZloaTjVwaVij//oFrBQy2BcchRZsDDJ/v+JOx/wqmGkxHAYG2ZJpqkkg17vDhQzyfIBsuEMDAwMFioCDPHzDjIyMDBgBBXJPkA3nIGBAWY4VkBSMiXVcJIsIMdwoi0g13CiLKDEcIIWhJsoUmQ4Xgtghm+79IhswxkYcCRTbC5feeY+WZkSwwfUNBzDAmobjmEBumGUGo4TYPPJyAUAW4NNsyZ7KA0AAAAASUVORK5CYII=","alt":"POC copper spear","width":24,"height":24},0]]'
    export function __copperSpearAsset(asset: number): number {
        return asset;
    }

    // Hidden image field: custom namespace magic gem.
    //% blockId=mcfunction_custom_asset_magic_gem_field
    //% block="$asset"
    //% blockHidden=true
    //% asset.fieldEditor="gridpicker"
    //% asset.fieldOptions.columns=1
    //% asset.fieldOptions.decompileLiterals=true
    //% asset.fieldOptions.data='[[{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA0ElEQVR4nO2UvQ2DMBCFP6JMQpXCc5AukgfIADQehoYBGIA6zIGUVKziFMgRv4dNICmS11jWWe/zvbMMP6ckTu2u5vnlbkMgR19jAK0M5+sJCgNgAaomj94CJHFqtTIArblbWwiAlSCHUHMnt9fKiHOZ7GAUyYxeNSGyEUC6tQiaiawX0RrzHoRxZOIMtlAPUDV5VNYZALfiEWTkzpd1xmxEe0gE+HYhnft8B905wHIX3fow/0nA1vL67EJfVFffeUXDOfhoKn9YiCgU8tcqPQF5F2MVvbOmagAAAABJRU5ErkJggg==","alt":"POC magic gem","width":24,"height":24},0]]'
    export function __magicGemAsset(asset: number): number {
        return asset;
    }

    // Hidden image field: custom namespace green cube.
    //% blockId=mcfunction_custom_asset_green_cube_field
    //% block="$asset"
    //% blockHidden=true
    //% asset.fieldEditor="gridpicker"
    //% asset.fieldOptions.columns=1
    //% asset.fieldOptions.decompileLiterals=true
    //% asset.fieldOptions.data='[[{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAxElEQVR4nO2VsRHCMAxFP1yOCSi4ywQp3DIFY9BkIhrGYJMUrJCCCWhMgw47liP9AF1eGSv/OSc7AlZ+Tei7yNQ3bPDpHAAgAsBwuW+s98yCSXDG7TrAElUX5oIZUfGACfaIMkHou7gkWBOJpGiy7OKbL0gpBO2xpUVSuzvsAQDP8VEXMKJpsIZ5DzSRJ9gt0ESeYGHrrlzIKjDJmvy+fRH4NJVBzn/6qyhOUbLoFmnBVQEjmgsWzHkgaJPMM3Bo2JH5d174MV+2Y+ehZAAAAABJRU5ErkJggg==","alt":"POC green cube","width":24,"height":24},0]]'
    export function __greenCubeAsset(asset: number): number {
        return asset;
    }

    //% weight=100
    //% blockId=mcfunction_custom_asset_poc_copper_spear
    //% block="imgasset minecraft:copper_spear $asset"
    //% asset.shadow="mcfunction_custom_asset_copper_spear_field"
    export function copperSpear(asset: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:copper_spear");
    }

    //% weight=99
    //% blockId=mcfunction_custom_asset_poc_magic_gem
    //% block="imgasset my_pack:magic_gem $asset"
    //% asset.shadow="mcfunction_custom_asset_magic_gem_field"
    export function magicGem(asset: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("my_pack:magic_gem");
    }

    //% weight=98
    //% blockId=mcfunction_custom_asset_poc_green_cube
    //% block="imgasset my_pack:green_cube $asset"
    //% asset.shadow="mcfunction_custom_asset_green_cube_field"
    export function greenCube(asset: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("my_pack:green_cube");
    }
}
