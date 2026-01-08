# Expense Tracker CLI

Sample solution for the [task-tracker](https://roadmap.sh/projects/expense-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

## How to run

### Install [pnpm](https://pnpm.io)

Linux & macOS.

```bash
brew install pnpm
```

Windows.

```bash
winget install -e --id pnpm.pnpm
```

Review pnpm's documentation for more installation options: [Docs](https://pnpm.io/installation)

### Clone the repository

1. Create a [fork](https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) of this project.

2. Create a [clone](https://docs.github.com/repositories/creating-and-managing-repositories/cloning-a-repository) of your project fork

3. Select your projects directory and create a new directory for your Expense Tracker CLI clone.

```bash
# Change Directory
cd <path-your-project-directory>

# Make directory
mkdir expense-tracker

# Change Directory
cd task-tracker

# Git clone
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```

### Install dependencies

```bash
pnpm install
```

### Create global bin directory

```bash
pnpm pnpm setup

source /Users/YOUR-USER/.zshrc
```

### Create link for use in the terminal

```bash
pnpm link
```

### Run the following commands

```bash
# To see the list of available commands
expense-tracker help
```
