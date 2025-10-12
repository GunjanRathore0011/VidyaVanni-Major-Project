const axios = require("axios");

// Helper function to fetch file content
async function fetchFileContent(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch file: " + url);
  }
}

exports.getRepoInfo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ error: "Repo URL required" });
    }

    // Extract owner and repo name
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      return res.status(400).json({ error: "Invalid GitHub repo URL" });
    }

    const [_, owner, repo] = match;

    // Get all files in repo
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const repoRes = await axios.get(apiUrl, {
      headers: { "User-Agent": "GitHub-Repo-Analyzer" },
    });
    const repoData = repoRes.data;

    if (!repoData.tree) {
      return res.status(404).json({ error: "No repo data found" });
    }

    // Filter only code-related files
    const codeFiles = repoData.tree.filter((file) =>
      file.path.match(/\.(js|jsx|ts|tsx|py|html|css|json|md)$/)
    );

    let combinedCode = "";

    // Limit to first 30 files to stay within model token limits
    for (const file of codeFiles.slice(0, 30)) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${file.path}`;
      try {
        const content = await fetchFileContent(rawUrl);
        combinedCode += `\n\n// FILE: ${file.path}\n${content}`;
      } catch (err) {
        console.log("Skipping file:", file.path);
      }
    }

    res.json({
      repo: `${owner}/${repo}`,
      raw_text: combinedCode || "No readable source code found.",
    });
  } catch (err) {
    console.error("Error in getRepoInfo:", err.message);
    res.status(500).json({
      error: "Failed to fetch repo info",
      details: err.message,
    });
  }
  
};
