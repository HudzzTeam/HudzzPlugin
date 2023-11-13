import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";
import PhoneNumberInput, { PhoneNumberInputProps } from "./PhoneNumberInput";

const isValidMock = vi.fn();
const onInputChangeMock = vi.fn();

const defaultPhoneNumberInputProps: PhoneNumberInputProps = {
  isValid: isValidMock,
  label: "",
  name: "",
  onInputChange: onInputChangeMock,
  value: "",
};

describe("PhoneNumberInput", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<PhoneNumberInput {...defaultPhoneNumberInputProps} />);

    // Assert
    const component = screen.getByTestId("phone-number-input");
    expect(component).not.toBeNull();
  });

  test("should call isValid and onInputChange when user types.", async () => {
    // Arrange
    const { user } = setup(<PhoneNumberInput {...defaultPhoneNumberInputProps} />);

    // Act
    const inputElement = screen.getByTestId("phone-number-input");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "5959");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");
    expect(isValidMock).toHaveBeenCalledTimes(4);
    expect(onInputChangeMock).toHaveBeenCalledTimes(4);
  });

  test("should clear aria-invalid when user types valid phone number.", async () => {
    // Arrange
    const { user } = setup(<PhoneNumberInput {...defaultPhoneNumberInputProps} />);

    // Act
    const inputElement = screen.getByTestId("phone-number-input");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "5555555");
    await user.click(document.body);

    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "true");

    await user.click(inputElement.querySelector("input") as HTMLInputElement);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "333");
    await user.click(document.body);

    // Assert
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
    expect(isValidMock).toHaveBeenCalledTimes(10);
    expect(onInputChangeMock).toHaveBeenCalledTimes(10);
  });
});
