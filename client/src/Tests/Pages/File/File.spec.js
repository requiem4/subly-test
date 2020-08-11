import { act } from "react-dom/test-utils";
import FilePage from "../../../Pages/File/FilePage";

describe("File  component", () => {
  test("it shows a list of files", async () => {
    const fakeResponse = [{ id: 1, name: "John Doe" }, {id: 2, name: "Kevin Mitnick" }];

    jest.spyOn(window, "fetch").mockImplementation(() => {
      const fetchResponse = {
        json: () => Promise.resolve(fakeResponse)
      };
      return Promise.resolve(fetchResponse);
    });

    await act(async () => {
      render(<FilePage />, container);
    });

    expect(container.textContent).toBe("John DoeKevin Mitnick");

    window.fetch.mockRestore();
  });
});