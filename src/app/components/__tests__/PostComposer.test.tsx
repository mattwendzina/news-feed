import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostComposer } from "../PostComposer";
import { describe, it } from "vitest";
import { StoreProvider } from "../../store/storeContext";

describe("PostComposer", () => {
  it("renders a post composer", () => {
    render(
      <StoreProvider>
        <PostComposer />
      </StoreProvider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("allows typing in the textarea", () => {
    render(
      <StoreProvider>
        <PostComposer />
      </StoreProvider>
    );

    const textArea = screen.getByPlaceholderText("What's on your mind?");
    const updatedValue = "Hello, World!";

    fireEvent.change(textArea, { target: { value: updatedValue } });

    // Verify the textarea has the typed value
    expect(textArea).toHaveValue(updatedValue);
  });
  // TODO - reimplement tests for form submission
  // it('calls "createPost" when the form is submitted', () => {
  //   render(
  //     <StoreProvider>
  //       <PostComposer />
  //     </StoreProvider>
  //   );
  //   const form = screen.getByRole("form");
  //   fireEvent.submit(form);
  // });
});
