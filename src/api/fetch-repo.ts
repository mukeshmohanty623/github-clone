import { console } from "inspector";

const apiKey = process.env.GITHUB_TOKEN;

export async function fetchRepo(owner: string, repo: string) {
  try{
    
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response
  }catch(error){
     console.error(error)
     throw new Error('Error fetching repo')
  }
}

export async function fetchUserDetails(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}

export async function fetchReadme(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}

export async function fetchReleases(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}

export async function fetchCommunityProfile(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/community/profile`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response

}  

export async function fetchTrees(owner: string, repo: string, branch: string="main") {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}

export async function fetchBranches(owner: string, repo: string,) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}

export async function fetchTags(owner: string, repo: string,) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/tags`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}




export async function fetchLastCommitDetails(owner: string, repo: string, branch: string = "main") {
  try {
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;
    const commitResponse = await fetch(commitUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/vnd.github.v3+json'
      },
    });

    if (!commitResponse.ok) {
      throw new Error(`Error fetching commit details: ${commitResponse.statusText}`);
    }

    const commit = await commitResponse.json();

    const prId = commit.commit.message.match(/#(\d+)/)?.[1] || '';

    return {
      lastCommitMessage: commit.commit.message,
      lastCommitMessageUrl: commit.html_url,
      lastCommitid: commit.sha,
      lastCommitModifiedTime: commit.commit.committer.date,
      totalCommits: '30',
      lastCommitAuthorName: commit.author.login,
      lastCommitAuthorImageSrcUrl: commit.author.avatar_url,
      lastCommitPrId: prId
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching commit details');
  }
}

export async function fetchContributors(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response
}