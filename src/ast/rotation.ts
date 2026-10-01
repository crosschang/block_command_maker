/**
 * Minecraft Rotation AST
 *
 * 지원:
 * - 절대 회전
 * - 상대 회전 (~)
 *
 * ^ 로컬 회전은 지원하지 않는다.
 */

namespace MCFunctionAST {

    /**
     * Rotation 축의 값 방식.
     */
    export enum RotationMode {
        Absolute = 0,
        Relative = 1
    }

    /**
     * 하나의 회전 값.
     *
     * 예:
     * 90   → Absolute, 90
     * ~    → Relative, 0
     * ~15  → Relative, 15
     */
    export interface RotationValue {
        mode: RotationMode;
        value: number;
    }

    /**
     * Minecraft Rotation.
     *
     * yaw   = 좌우 회전
     * pitch = 상하 회전
     */
    export interface Rotation {
        yaw: RotationValue;
        pitch: RotationValue;
    }

    /**
     * RotationValue 생성.
     */
    export function createRotationValue(
        mode: RotationMode,
        value: number
    ): RotationValue {
        return {
            mode: mode,
            value: value
        };
    }

    /**
     * 절대 Rotation 생성.
     *
     * 예:
     * createAbsoluteRotation(90, 0)
     */
    export function createAbsoluteRotation(
        yaw: number,
        pitch: number
    ): Rotation {
        return {
            yaw: createRotationValue(RotationMode.Absolute, yaw),
            pitch: createRotationValue(RotationMode.Absolute, pitch)
        };
    }

    /**
     * 상대 Rotation 생성.
     *
     * 예:
     * createRelativeRotation(90, 0)
     * → ~90 ~
     */
    export function createRelativeRotation(
        yaw: number,
        pitch: number
    ): Rotation {
        return {
            yaw: createRotationValue(RotationMode.Relative, yaw),
            pitch: createRotationValue(RotationMode.Relative, pitch)
        };
    }

    /**
     * yaw / pitch를 각각 다른 방식으로 지정.
     *
     * Parser나 상세 입력 UI에서 사용한다.
     */
    export function createRotation(
        yaw: RotationValue,
        pitch: RotationValue
    ): Rotation {
        return {
            yaw: yaw,
            pitch: pitch
        };
    }
}