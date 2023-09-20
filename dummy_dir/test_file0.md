Code challenge:
Read the challenge's details and have fun coding! Once you have completed it, submit your
solutions by providing URLs for both GitHub repository and live app on any hosting platform (5
Free Hosting Platform) and briefly explain what you have done.
As long as you fulfill all the challenge’s requirements, you can give your personal touch by adding
transitions, using your own images, changing colors, etc.
Remember to put your name on the footer to prevent others from submitting your solutions.
Traversing a directory structure in a file system programmatically is a common task. In this
challenge, you'll utilize Node.js's file system library to create a tree-like object that contains information about a directory and all of its subdirectories up to a specified depth. This structure
can be valuable for in-memory manipulation, transmission, and displaying a file system in a web
page or terminal application.
For the purpose of this task, let's assume we're working with a Linux file system.
Please implement the following function:
function directoryToTree(rootPath, maxDepth)
Function Parameters:
● rootPath: String - The path to the root directory you want to process (relative to
`process.cwd()`).
● maxDepth: Number - The depth of the directory tree to include in the result structure; it
must be >= 0, where 0 represents the root level (inclusive).
Return Value:
● An object representing the tree structure.
The return value should be an object with two types of nodes: file nodes and directory nodes,
corresponding to file and directory entities in the file system. Nodes in the output structure must
be objects containing 4 or 5 properties as described below:
● name: The name of the file or directory, including extensions, without the leading path or
trailing slash (for directories).
● path: A string representing the path to the file or directory, starting from and including the
rootPath. It should be a relative path without the "./" prefix or trailing "/".
● type: For this challenge, it can be either "dir" (for directories) or "file." Handling symbolic
links or other file types is not required.
● size: An integer representing the file or directory size in bytes.
● children: This property should be present for all "dir" nodes (even if empty) and absent for
all "file" nodes. It contains a list of child nodes within the current directory, following the
same structural requirements as the parent node.
All input strings will point to a valid directory, so you don't need to worry about error handling.
However, you're welcome to make your code robust to handle failures if you prefer. Additionally,
feel free to consult Node.js documentation to find the necessary functions and modules to obtain
the required information.

Examples:
Example 1:
directoryToTree("dummy_dir/a_dir", 5);
This path points to the "a_dir" directory, which contains only one empty file. The function should
return:
{
 "path": "dummy_dir/a_dir",
 "name": "a_dir",
 "type": "dir",
 "size": 4096,
 "children": [
 {
 "path": "dummy_dir/a_dir/test_file1.md",
 "name": "test_file1.md",
 "type": "file",
 "size": 0
 }
 ]
}
Example 2:
directoryToTree("dummy_dir", 5);
This example has a depth limitation that includes all files and directories in the tree structure.
Pay attention to the file sizes. The function should return:
{
 "path": "dummy_dir",
 "name": "dummy_dir",
 "type": "dir",
 "size": 4096,
 "children": [
 {
 "path": "dummy_dir/a_dir",
 "name": "a_dir",
 "type": "dir",
 "size": 4096,
 "children": [
 {
 "path": "dummy_dir/a_dir/test_file1.md", "name": "test_file1.md",
 "type": "file",
 "size": 0
 }
 ]
 },
 {
 "path": "dummy_dir/b_dir",
 "name": "b_dir",
 "type": "dir",
 "size": 4096,
 "children": [
 {
 "path": "dummy_dir/b_dir/test_file2.md",
 "name": "test_file2.md",
 "type": "file",
 "size": 4
 }
 ]
 },
 {
 "path": "dummy_dir/test_file0.md",
 "name": "test_file0.md",
 "type": "file",
 "size": 13
 }
 ]
}
Example 3:
directoryToTree("dummy_dir", 1);
Here, the depth is limited to 1 level (0 represents the root level). In other words, it should only
return the root node, "dummy_dir," along with its immediate children. If the depth argument were
set to 0, only the root node would be returned (depth is never negative). The output should be:
{
 "path": "dummy_dir",
 "name": "dummy_dir",
 "type": "dir",
 "size": 4096,
 "children": [
{
"path": "dummy_dir/a_dir",
 "name": "a_dir",
 "type": "dir",
 "size": 4096,
 "children": []
 },
 {
 "path": "dummy_dir/b_dir",
 "name": "b_dir",
 "type": "dir",
 "size": 4096,
 "children": []
 },
 {
 "path": "dummy_dir/test_file0.md",
 "name": "test_file0.md",
 "type": "file",
 "size": 13
 }
 ]
}
Feel free to add or modify directories to create additional tests.


git commit -m "second commit with structure for test hype MX"
