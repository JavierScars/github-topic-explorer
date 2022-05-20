import { Spinner } from "@chakra-ui/react";
import { FC } from "react";

export interface LoadingSpinnerProps {
  isLoading: boolean;
}
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ isLoading }) => {
  return isLoading ? (
    <Spinner
      data-testid="loading-spinner"
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      label="Loading topics..."
    />
  ) : null;
};
