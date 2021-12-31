import dirTree, { DirectoryTree } from "directory-tree";

interface ReadDirectoryOptions {
  path: string;
  extensions?: string[];
}

export const readDirectoryAndReturnFileNames = (
  options: ReadDirectoryOptions
): DirectoryTree => {
  const { path } = options;
  return dirTree(path);
};
