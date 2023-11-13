import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";
import PatternTextInput, { PatternTextInputProps } from "./PatternTextInput";

const isValidMock = vi.fn();
const onChangeMock = vi.fn();

const defaultPatternInputProps: PatternTextInputProps = {
  endAdornment: "",
  error: false,
  format: "",
  id: "",
  isValid: isValidMock,
  label: "",
  maxLength: undefined,
  name: "",
  onChange: onChangeMock,
  required: false,
  value: "",
};

describe("PatternTextInput", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<PatternTextInput {...defaultPatternInputProps} />);

    // Assert
    const component = screen.getByTestId("pattern-text-input");
    expect(component).not.toBeNull();
  });

  test("should call onChange and isValid when data is changed.", async () => {
    // Arrange
    const { user } = setup(<PatternTextInput {...defaultPatternInputProps} />);

    // Act
    const inputElement = screen.getByTestId("pattern-text-input");
    await user.type(inputElement.querySelector("input") as HTMLInputElement, "12345");

    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(5);
    expect(isValidMock).toHaveBeenCalledTimes(5);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });

  test("should call clear error when input is focused again.", async () => {
    // Arrange
    const { user } = setup(<PatternTextInput {...defaultPatternInputProps} format="#####" />);

    // Act
    const inputElement = screen.getByTestId("pattern-text-input");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "333");
    screen.debug();
    expect(inputElement.querySelector("input")).toHaveValue("333  ");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");

    // Act
    await user.type(inputElement.querySelector("input") as HTMLInputElement, "3312");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
    expect(inputElement.querySelector("input")).toHaveValue("33333");
    expect(onChangeMock).toHaveBeenCalledTimes(7);
    expect(isValidMock).toHaveBeenCalledTimes(7);
  });
});
