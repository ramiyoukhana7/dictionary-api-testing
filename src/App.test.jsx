import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  test("should show input and button when page loads", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Should render data when the user searches "food"', async () => {
    // Vi renderar appen
    render(<App />);
    // Vi skapar en userEvent för härma riktiga användare beteende.
    const user = userEvent.setup();
    // Vi identiferar vår input field
    const input = screen.getByRole("textbox");
    // Vi gör så att användaren skriver in "food" i input fältet
    await user.type(input, "food");
    // Vi klickar på knappen och genomför vår sökning
    const button = screen.getByRole("button");
    await user.click(button);

    // Vi speciferar vad för reslutat ska visas på skärmen ifall en matchning sker
    expect(await screen.findByText("food")).toBeInTheDocument();
    expect(await screen.findByText("Part Of Speech:")).toBeInTheDocument();
    expect(await screen.findByText("Example:")).toBeInTheDocument();
  });

  test("Should render error message when no value is in input search", async () => {
    render(<App />);

    const user = userEvent.setup();

    const button = screen.getByRole("button");
    await user.click(button);

    expect(
      await screen.getByText(
        "Sorry pal, we couldn't find definitions for the word you were looking for."
      )
    ).toBeInTheDocument();
  });

  test("Should render error message when the word is not found in the dictionary", async () => {
    render(<App />);

    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.type(input, "adsasdsas");

    const button = screen.getByRole("button");
    await user.click(button);

    expect(
      await screen.findByText(
        "Sorry pal, we couldn't find definitions for the word you were looking for."
      )
    ).toBeInTheDocument();
  });

  test("Should render audio playlist", async () => {
    render(<App />);

    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.type(input, "food");

    const button = screen.getByRole("button");
    await user.click(button);

    expect(await screen.findByTestId("audio")).toBeInTheDocument();
  });

  test("Should render synonyms of the word", async () => {
    render(<App />);

    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.type(input, "Food");

    const button = screen.getByRole("button");
    await user.click(button);

    expect(await screen.findByText("Synonym:")).toBeInTheDocument();
  });

  test("Should render words phonetic", async () => {
    render(<App />);

    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.type(input, "Food");

    const button = screen.getByRole("button");
    await user.click(button);

    expect(await screen.findByText("Phonetic:")).toBeInTheDocument();
  });

  test("Should render words phonetic text", async () => {
    render(<App />);
    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.type(input, "food");

    const button = screen.getByRole("button");
    await user.click(button);

    expect(await screen.findByText("Phonetic Text:")).toBeInTheDocument();
  });
});
