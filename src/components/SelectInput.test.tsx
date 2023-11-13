import "@testing-library/jest-dom";
import { render, screen, setup } from "../test/testUtils";

import SelectInput, { SelectInputProps } from "./SelectInput";

const onChangeMock = vi.fn();

const defaultSelectInputProps: SelectInputProps = {
  id: "",
  label: "",
  onChange: onChangeMock,
  options: [],
  value: "",
};

describe("SelectInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    // Arrange
    render(<SelectInput {...defaultSelectInputProps} />);

    // Assert
    const component = screen.getByTestId("select-input");
    expect(component).not.toBeNull();
  });

  test("should call onChange when data is changed.", async () => {
    // Arrange
    const testOptions = [
      { label: "Test 1", value: "test1" },
      { label: "Test 2", value: "test2" },
      { label: "Test 3", value: "test3" },
    ];
    const { user } = setup(
      <SelectInput {...defaultSelectInputProps} id="select" options={testOptions} />,
    );

    const inputElement = screen.getByTestId("select-input");
    // Act

    await user.click(screen.getByRole("button"));

    await user.click(screen.getByRole("option", { name: "Test 1" }));

    // Assert
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(inputElement.querySelector("input")).toHaveAttribute("aria-invalid", "false");
  });
});
