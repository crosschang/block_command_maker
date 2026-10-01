/**
 * Minecraft Position AST
 *
 * Minecraft 좌표를 문자열이 아니라 구조화된 데이터로 표현한다.
 *
 * 지원 좌표:
 * - Absolute : 10 64 -20
 * - Relative : ~ ~1 ~
 * - Local    : ^ ^ ^3
 */

namespace MCFunctionAST {

    /**
     * 각 좌표축의 좌표 방식.
     */
    export enum CoordinateMode {
        Absolute = 0,
        Relative = 1,
        Local = 2
    }

    /**
     * X / Y / Z 각각의 좌표 값.
     *
     * 예:
     * 10  → Absolute, 10
     * ~   → Relative, 0
     * ~1  → Relative, 1
     * ^3  → Local, 3
     */
    export interface Coordinate {
        mode: CoordinateMode;
        value: number;
    }

    /**
     * Minecraft 3차원 Position.
     */
    export interface Position {
        x: Coordinate;
        y: Coordinate;
        z: Coordinate;
    }

    /**
     * 좌표 하나 생성.
     */
    export function createCoordinate(
        mode: CoordinateMode,
        value: number
    ): Coordinate {
        return {
            mode: mode,
            value: value
        };
    }

    /**
     * 절대 좌표 Position 생성.
     *
     * 예:
     * createAbsolutePosition(10, 64, -20)
     */
    export function createAbsolutePosition(
        x: number,
        y: number,
        z: number
    ): Position {
        return {
            x: createCoordinate(CoordinateMode.Absolute, x),
            y: createCoordinate(CoordinateMode.Absolute, y),
            z: createCoordinate(CoordinateMode.Absolute, z)
        };
    }

    /**
     * 상대 좌표 Position 생성.
     *
     * 예:
     * createRelativePosition(0, 1, 0)
     * → ~ ~1 ~
     */
    export function createRelativePosition(
        x: number,
        y: number,
        z: number
    ): Position {
        return {
            x: createCoordinate(CoordinateMode.Relative, x),
            y: createCoordinate(CoordinateMode.Relative, y),
            z: createCoordinate(CoordinateMode.Relative, z)
        };
    }

    /**
     * 로컬 좌표 Position 생성.
     *
     * 예:
     * createLocalPosition(0, 0, 3)
     * → ^ ^ ^3
     */
    export function createLocalPosition(
        x: number,
        y: number,
        z: number
    ): Position {
        return {
            x: createCoordinate(CoordinateMode.Local, x),
            y: createCoordinate(CoordinateMode.Local, y),
            z: createCoordinate(CoordinateMode.Local, z)
        };
    }

    /**
     * X/Y/Z의 좌표 방식을 각각 지정해서 Position 생성.
     *
     * Parser나 상세 좌표 입력 UI에서 사용한다.
     */
    export function createPosition(
        x: Coordinate,
        y: Coordinate,
        z: Coordinate
    ): Position {
        return {
            x: x,
            y: y,
            z: z
        };
    }
}