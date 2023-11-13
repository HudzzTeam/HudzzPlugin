import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";

import CustomAutoComplete, { CustomAutoCompleteProps } from "./CustomAutoComplete";

const onValueChangeMock = vi.fn();

const defaultCustomAutoCompleteProps: CustomAutoCompleteProps = {
  id: "",
  label: "",
  onValueChange: onValueChangeMock,
  options: [],
  value: "",
};

describe("CustomAutoComplete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<CustomAutoComplete {...defaultCustomAutoCompleteProps} />);

    // Assert
    const component = screen.getByTestId("custom-auto-complete");
    expect(component).not.toBeNull();
  });

  test("should call onValueChange when data is changed after user types and selects.", async () => {
    // Arrange
    const testOptions = ["Test 1", "Test 2", "Test 3"];
    const { user } = setup(
      <CustomAutoComplete {...defaultCustomAutoCompleteProps} options={testOptions} />,
    );

    // Act
    const inputElement = screen.getByTestId("custom-auto-complete");

    await user.type(inputElement.querySelector("input") as HTMLInputElement, "Tes");
    await user.click(screen.getByRole("option", { name: "Test 1" }));

    // Assert
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });

  test("should call onValueChange when data is changed after user clicks and selects.", async () => {
    // Arrange
    const testOptions = ["Test 1", "Test 2", "Test 3"];
    const { user } = setup(
      <CustomAutoComplete {...defaultCustomAutoCompleteProps} options={testOptions} />,
    );

    // Act
    const inputElement = screen.getByTestId("custom-auto-complete");

    await user.click(inputElement.querySelector("input") as HTMLInputElement);
    await user.click(screen.getByRole("option", { name: "Test 2" }));

    // Assert
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });
});
