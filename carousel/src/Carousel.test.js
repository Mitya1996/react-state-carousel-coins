import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("renders without crashing", function () {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left / right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("doesn't show left / right arrow on first / last image", function () {
  const { queryByTestId } = render(<Carousel />);

  let leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  //only right arrow visible on first image
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);
  leftArrow = queryByTestId("left-arrow");

  //both arrows visible on second image
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);

  //only left arrow visible on last image
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});