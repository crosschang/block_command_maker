/**
 * Minecraft Facing AST
 *
 * 지원:
 * - facing <position>
 * - facing entity <selector> <eyes|feet>
 */

namespace MCFunctionAST {

    /**
     * Facing 종류.
     */
    export enum FacingKind {
        Position = 0,
        Entity = 1
    }

    /**
     * Entity Facing 기준점.
     */
    export enum EntityAnchor {
        Eyes = 0,
        Feet = 1
    }

    /**
     * Facing AST.
     *
     * kind에 따라 position 또는 entitySelector를 사용한다.
     */
    export interface Facing {
        kind: FacingKind;

        position?: Position;

        entitySelector?: Selector;
        anchor?: EntityAnchor;
    }

    /**
     * Position을 바라보는 Facing 생성.
     */
    export function createFacingPosition(
        position: Position
    ): Facing {
        return {
            kind: FacingKind.Position,
            position: position
        };
    }

    /**
     * Entity를 바라보는 Facing 생성.
     */
    export function createFacingEntity(
        selector: Selector,
        anchor: EntityAnchor
    ): Facing {
        return {
            kind: FacingKind.Entity,
            entitySelector: selector,
            anchor: anchor
        };
    }

    /**
     * Anchor 이름.
     *
     * 실제 facing 전체 문자열을 컴파일하는 함수가 아니다.
     */
    export function entityAnchorToken(
        anchor: EntityAnchor
    ): string {
        switch (anchor) {
            case EntityAnchor.Eyes:
                return "eyes";

            case EntityAnchor.Feet:
                return "feet";

            default:
                return "feet";
        }
    }
}