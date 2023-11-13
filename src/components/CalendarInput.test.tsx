import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";

import CalendarInput, { CalendarInputProps } from "./CalendarInput";

const onValueChangeMock = vi.fn();

const defaultCalendarInputProps: CalendarInputProps = {
  id: "",
  label: "",
  onValueChange: onValueChangeMock,
  value: null,
};

describe("CalendarInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<CalendarInput {...defaultCalendarInputProps} />);

    // Assert
    const component = screen.getByTestId("calendar-input");
    expect(component).not.toBeNull();
  });

  test("should call onValueChange when data is changed after user types and selects.", async () => {
    // Arrange
    const { user } = setup(<CalendarInput {...defaultCalendarInputProps} />);

    // Act
    const inputElement = screen.getByTestId("calendar-input");

    await user.type(inputElement, "01012021");

    // Assert
    expect(onValueChangeMock).toHaveBeenCalledTimes(3);
    expect(inputElement).toHaveAttribute("aria-invalid", "false");
  });

  test("should call onValueChange when data is changed after user clicks and selects.", async () => {
    // Arrange
    const { user } = setup(<CalendarInput {...defaultCalendarInputProps} />);

    // Act
    const inputElement = screen.getByTestId("calendar-input");
    await user.click(screen.getByLabelText("Choose date"));
    await user.click(screen.getByText("1"));

    // Assert
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveAttribute("aria-invalid", "false");
  });
});
