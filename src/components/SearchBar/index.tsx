import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";

export interface SearchBarProps {
  onSearch: (search: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const SearchBar = ({
  onSearch,
  initialValue = "",
  placeholder = "",
}: SearchBarProps) => {
  const [search, setSearch] = useState(initialValue);

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  return (
    <Flex
      direction="row"
      data-testid="search-bar-component"
      position="relative"
    >
      <Input
        data-testid="search-input"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleOnEnter}
      />
      <Button
        data-testid="search-action"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        onClick={() => onSearch(search)}
        position="absolute"
        right="0"
        top="0"
        zIndex={10}
        colorScheme="cyan"
        color="white"
        aria-label="Search topic"
      >
        <Search2Icon />
      </Button>
    </Flex>
  );
};
