import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";
import ValidatedTextField, { ValidatedTextFieldProps } from "./ValidatedTextField";

const isValidMock = vi.fn();
const validateMock = vi.fn();
const onChangeMock = vi.fn();

const defaultValidatedTextFieldProps: ValidatedTextFieldProps = {
  isValid: isValidMock,
  name: "",
  onChange: onChangeMock,
  validate: validateMock,
};

describe("ValidatedTextField", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<ValidatedTextField {...defaultValidatedTextFieldProps} />);

    // Assert
    const component = screen.getByTestId("validated-text-field");
    expect(component).not.toBeNull();
  });

  test("ValidateTextField should call onChange when data is changed.", async () => {
    // Arrange
    const { user } = setup(<ValidatedTextField {...defaultValidatedTextFieldProps} />);

    // Act
    const inputElement = screen.getByTestId("validated-text-field");
    await user.type(inputElement.querySelector("input") as HTMLInputElement, "abcde");

    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(5);
    expect(validateMock).toHaveBeenCalledTimes(5);
    expect(isValidMock).toHaveBeenCalledTimes(5);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });

  test("should call isValid onBlur when input fails validation check.", async () => {
    // Arrange
    validateMock.mockImplementationOnce(() => false);

    const { user } = setup(<ValidatedTextField {...defaultValidatedTextFieldProps} />);

    // Act
    const inputElement = screen.getByTestId("validated-text-field");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "a");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(isValidMock).toHaveBeenCalledTimes(1);
  });

  test("should clear error when input is focused again.", async () => {
    // Arrange
    validateMock.mockImplementationOnce(() => false);
    const { user } = setup(<ValidatedTextField {...defaultValidatedTextFieldProps} />);

    // Act
    const inputElement = screen.getByTestId("validated-text-field");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "a");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");

    // Act
    await user.click(inputElement.querySelector("input") as HTMLInputElement);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(isValidMock).toHaveBeenCalledTimes(1);
  });

  test("should send key and boolean to callback when isValid is called", async () => {
    // Arrange
    validateMock.mockImplementation((val: string) => val.length > 2);
    const { user } = setup(
      <ValidatedTextField {...defaultValidatedTextFieldProps} name="myfield" />,
    );

    // Act
    const inputElement = screen.getByTestId("validated-text-field");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "a");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");
    expect(isValidMock).toBeCalledWith({ myfield: false });

    // Act
    await user.click(inputElement.querySelector("input") as HTMLInputElement);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");

    // Assert
    await user.type(inputElement.querySelector("input") as HTMLInputElement, "aa");
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
    expect(isValidMock).toBeCalledWith({ myfield: true });
  });
});
