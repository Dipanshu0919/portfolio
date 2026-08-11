"""
portfolio_module.py — The `portfolio` module available inside the Python sandbox.

Usage inside the sandbox:
    from portfolio import projects, skills, experience, about, contact

This module only exposes sanitized portfolio information.
No server paths, env vars, credentials, or internal info.
"""

from portfolio_data import PROJECTS, SKILL_GROUPS, EXPERIENCE, ABOUT, CONTACT


class ProjectEntry:
    """Represents a single portfolio project."""

    def __init__(self, data: dict):
        self._data = data
        self.id = data["id"]
        self.name = data["name"]
        self.role = data["role"]
        self.tagline = data["tagline"]
        self.tech = data["tech"]
        self.overview = data["overview"]

    def __repr__(self):
        return f"<Project id={self.id!r} name={self.name!r}>"

    def __str__(self):
        return self.name

    def show(self):
        """Print full project details."""
        p = self._data
        lines = [
            f"{'─' * 60}",
            f"  {p['name']}",
            f"  Role: {p['role']}",
            f"{'─' * 60}",
            f"",
            f"Overview:",
            f"  {p['overview']}",
            f"",
            f"Purpose:",
            f"  {p['purpose']}",
            f"",
            f"My Role:",
        ]
        for item in p.get("my_role", []):
            lines.append(f"  • {item}")
        lines += ["", "What I Developed:"]
        for item in p.get("developed", []):
            lines.append(f"  • {item}")
        lines += ["", "What I Tested:"]
        for item in p.get("tested", []):
            lines.append(f"  • {item}")
        lines += ["", "What I Deployed:"]
        for item in p.get("deployed", []):
            lines.append(f"  • {item}")
        lines += ["", "Technologies:"]
        lines.append(f"  {', '.join(p.get('tech', []))}")
        lines += ["", "Outcome:"]
        lines.append(f"  {p['outcome']}")
        lines.append(f"{'─' * 60}")
        print("\n".join(lines))


class ProjectsCollection:
    """Collection of portfolio projects. `from portfolio import projects`"""

    def __init__(self, data_list):
        self._projects = [ProjectEntry(d) for d in data_list]
        self._by_id = {p.id: p for p in self._projects}

    def list(self):
        """Print all projects."""
        print(f"Projects: {len(self._projects)}")
        print()
        for i, p in enumerate(self._projects, 1):
            print(f"  [{i:02d}] {p.name}")
            print(f"       Role: {p.role}")
            print(f"       Tech: {', '.join(p.tech)}")
            print()

    def show(self, project_id: str):
        """Show full details for a specific project by ID."""
        p = self._by_id.get(project_id)
        if p is None:
            available = ", ".join(repr(pid) for pid in self._by_id)
            print(f"KeyError: no project with id {project_id!r}")
            print(f"Available IDs: {available}")
            return
        p.show()

    def ids(self):
        """Return list of all project IDs."""
        return list(self._by_id.keys())

    def __len__(self):
        return len(self._projects)

    def __iter__(self):
        return iter(self._projects)

    def __getitem__(self, key):
        if isinstance(key, int):
            return self._projects[key]
        return self._by_id[key]

    def __repr__(self):
        return f"<ProjectsCollection: {len(self._projects)} projects>"

    def __str__(self):
        lines = [f"Projects loaded: {len(self._projects)}", ""]
        for p in self._projects:
            lines.append(f"  [{p._data['idx']}] {p.name}")
        lines += [
            "",
            "Try: projects.list()  or  projects.show('qr-platform')",
        ]
        return "\n".join(lines)


class SkillsCollection:
    """Collection of skills. `from portfolio import skills`"""

    def __init__(self, groups):
        self._groups = groups

    def list(self):
        """Print all skill categories."""
        print("Skills:")
        print()
        for g in self._groups:
            print(f"  {g['name']}:")
            for item in g["items"]:
                print(f"    • {item}")
            print()

    def categories(self):
        """Return list of skill category names."""
        return [g["name"] for g in self._groups]

    def __repr__(self):
        cats = ", ".join(g["name"] for g in self._groups)
        return f"<SkillsCollection categories=[{cats}]>"

    def __str__(self):
        lines = ["Skills:"]
        for g in self._groups:
            lines.append(f"  {g['name']}: {', '.join(g['items'])}")
        return "\n".join(lines)


class ExperienceRecord:
    """Work experience. `from portfolio import experience`"""

    def __init__(self, data):
        self._data = data

    def show(self):
        """Print experience details."""
        d = self._data
        print(f"{'─' * 60}")
        print(f"  {d['company']} — {d['role']}")
        print(f"  {d['period']}")
        print(f"{'─' * 60}")
        print()
        for area in d["areas"]:
            print(f"  • {area}")

    def __repr__(self):
        return f"<Experience company={self._data['company']!r} role={self._data['role']!r}>"

    def __str__(self):
        d = self._data
        return f"{d['company']} — {d['role']} ({d['period']})"


def about():
    """Print Dipanshu's about information."""
    for line in ABOUT:
        print(line)


def contact():
    """Print contact information."""
    c = CONTACT
    print("Contact:")
    print()
    print(f"  Email:    {c['email']}")
    print(f"  GitHub:   {c['github']}")
    print(f"  LinkedIn: {c['linkedin']}")


# Module-level singletons (what gets imported)
projects = ProjectsCollection(PROJECTS)
skills = SkillsCollection(SKILL_GROUPS)
experience = ExperienceRecord(EXPERIENCE)

__all__ = ["projects", "skills", "experience", "about", "contact"]
