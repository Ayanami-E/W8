import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import MyContainer from "../src/components/MyContainer";

test("renders MyContainer component", () => {
  render(<MyContainer />);
  expect(screen.getByText("Welcome to MyContainer")).toBeInTheDocument();
});
