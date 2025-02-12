
const GITHUB_API_URL = 'https://api.github.com';
const apiKey = process.env.GITHUB_TOKEN;
async function getLatestCommit(OWNER:string, REPO:string, BRANCH:string) {
    const url = `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/commits/${BRANCH}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching latest commit: ${response.statusText}`);
    }

    const commit = await response.json();
    return commit;
}

async function getLastCommitForPath(OWNER:string, REPO:string,path:string) {
    const url = `${GITHUB_API_URL}/repos/${OWNER}/${REPO}/commits?path=${path}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching commits for path: ${response.statusText}`);
    }

    const commits = await response.json();
    const lastCommit = commits[0];
    const prId = lastCommit?.commit?.message?.match(/#(\d+)/)?.[1] || '';
    return {
        commitMessage: lastCommit?.commit?.message,
        lastModified: lastCommit?.commit?.committer.date,
        commitMessageUrl: lastCommit?.html_url,
        prId
    };
}

export async function getTreeWithLatestCommit(OWNER:string, REPO:string, BRANCH:string) {
    const latestCommit = await getLatestCommit(OWNER, REPO, BRANCH);
    const treeUrl = latestCommit.commit.tree.url;
    const treeResponse = await fetch(treeUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!treeResponse.ok) {
        throw new Error(`Error fetching tree: ${treeResponse.statusText}`);
    }

    const tree = await treeResponse.json();
    let filesAndFolders = await Promise.all(tree.tree.map(async (item:{type:string,path:string;}) => {
        const { commitMessage, lastModified, commitMessageUrl, prId } = await getLastCommitForPath(OWNER,REPO,item.path);
        return {
            type: item.type === 'blob' ? 'file' : 'folder',
            fileName: item.path,
            commitMessage,
            commitMessageUrl,
            prId,
            lastModified
        };
    }));

    filesAndFolders = filesAndFolders.sort((a, b) => {
        if (a.type === b.type) {
            if (a.fileName[0] === b.fileName[0]) {
                return a.fileName.localeCompare(b.fileName);
            }
            if (a.fileName[0].toUpperCase() === a.fileName[0] && b.fileName[0].toUpperCase() !== b.fileName[0]) {
                return -1;
            }
            if (a.fileName[0].toUpperCase() !== a.fileName[0] && b.fileName[0].toUpperCase() === b.fileName[0]) {
                return 1;
            }
            return a.fileName.localeCompare(b.fileName);
        }
        return a.type === 'folder' ? -1 : 1;
    });

    return filesAndFolders;
}

