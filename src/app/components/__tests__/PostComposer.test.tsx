import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostComposer } from "../PostComposer";
import { describe, it, vi } from "vitest";

describe("PostComposer", () => {
  it("renders a post composer", () => {
    render(<PostComposer createPost={vi.fn()} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("allows typing in the textarea", () => {
    render(<PostComposer createPost={vi.fn()} />);

    const textArea = screen.getByPlaceholderText("What's on your mind?");
    const updatedValue = "Hello, World!";

    fireEvent.change(textArea, { target: { value: updatedValue } });

    // Verify the textarea has the typed value
    expect(textArea).toHaveValue(updatedValue);
  });
  it('calls "createPost" when the form is submitted', () => {
    const createPostMock = vi.fn();
    render(<PostComposer createPost={createPostMock} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(createPostMock).toHaveBeenCalled();
  });
});
