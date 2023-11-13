import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";

import CustomTextField, { CustomTextFieldProps } from "./CustomTextField";

const onChangeMock = vi.fn();

const defaultCustomTextFieldProps: CustomTextFieldProps = {
  id: "",
  label: "",
  onChange: onChangeMock,
  required: false,
};

describe("CustomTextField", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<CustomTextField {...defaultCustomTextFieldProps} />);

    // Assert
    const component = screen.getByTestId("custom-text-field");
    expect(component).not.toBeNull();
  });

  test("should call onChange when data is changed.", async () => {
    // Arrange
    const { user } = setup(<CustomTextField {...defaultCustomTextFieldProps} />);

    // Act
    const inputElement = screen.getByTestId("custom-text-field");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "abcde");

    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(5);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });
});
