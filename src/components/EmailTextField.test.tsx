import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";

import EmailTextField, { EmailTextFieldProps } from "./EmailTextField";

const isValidMock = vi.fn();
const onChangeMock = vi.fn();

const defaultEmailTextFieldProps: EmailTextFieldProps = {
  isValid: isValidMock,
  onChange: onChangeMock,
};

describe("EmailTextField", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<EmailTextField {...defaultEmailTextFieldProps} />);

    // Assert
    const component = screen.getByTestId("email-text-field");
    expect(component).not.toBeNull();
  });

  test("should call onChange and isValid when data is changed.", async () => {
    // Arrange
    const { user } = setup(<EmailTextField {...defaultEmailTextFieldProps} />);

    // Act
    const inputElement = screen.getByTestId("email-text-field");
    await user.type(inputElement.querySelector("input") as HTMLInputElement, "abcde");

    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(5);
    expect(isValidMock).toHaveBeenCalledTimes(5);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });

  test("should call clear error when input is focused again.", async () => {
    // Arrange
    const { user } = setup(<EmailTextField {...defaultEmailTextFieldProps} />);

    // Act
    const inputElement = screen.getByTestId("email-text-field");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "a");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");

    // Act
    await user.type(inputElement.querySelector("input") as HTMLInputElement, "a@b.com");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
    expect(onChangeMock).toHaveBeenCalledTimes(8);
    expect(isValidMock).toHaveBeenCalledTimes(8);
  });
});
