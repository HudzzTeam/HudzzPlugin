import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";

import CurrencyInput, { CurrencyInputProps } from "./CurrencyInput";

const onChangeMock = vi.fn();

const defaultCurrencyInputProps: CurrencyInputProps = {
  id: "",
  label: "",
  onChange: onChangeMock,
  value: "",
};

describe("CurrencyInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<CurrencyInput {...defaultCurrencyInputProps} />);

    // Assert
    const component = screen.getByTestId("currency-input");
    expect(component).not.toBeNull();
  });

  test("should call onChange when data is changed after user types.", async () => {
    // Arrange
    const { user } = setup(<CurrencyInput {...defaultCurrencyInputProps} />);

    // Act
    const inputElement = screen.getByTestId("currency-input");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "123");

    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });
});
