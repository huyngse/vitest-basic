import { act, renderHook } from "@testing-library/react"
import { useCounter } from "./useCounter"

describe("useCounter hook", () => {
    it("should initialize with default value", () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
    });

    it("should initialize with given value", () => {
        const { result } = renderHook(() => useCounter(5));
        expect(result.current.count).toBe(5);
    });

    it("should increase the count", () => {
        const { result } = renderHook(() => useCounter());
        act(() => result.current.increment());
        expect(result.current.count).toBe(1);
    });

    it("should decrease the count", () => {
        const { result } = renderHook(() => useCounter());
        act(() => result.current.decrement());
        expect(result.current.count).toBe(-1);
    });

    it("should reset the count", () => {
        const { result } = renderHook(() => useCounter(10));
        act(() => result.current.increment());
        act(() => result.current.reset());
        expect(result.current.count).toBe(10);
    })
})