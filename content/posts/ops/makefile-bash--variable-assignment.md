---
title: "Differences, priorities, and Bash equivalents for :=, =, and ?= in Makefiles"
date: 2025-02-03
categories: ["ops"]
tags: ["Makefile","Bash"]
---


Differences, priorities, and Bash equivalents for :=, =, and ?= in Makefiles

---
You're right, I apologize for the confusion in my previous response. Let me provide a correct explanation of the differences, priorities, and Bash equivalents for :=, =, and ?= in Makefiles.

Makefile variable assignment operators:

1. := (Simple expansion):
   - Expands variables immediately at assignment time.
   - Example: FOO := $(BAR)
   - If BAR changes later, FOO will not be affected.

2. = (Recursive expansion):
   - Defers expansion until the variable is used.
   - Example: FOO = $(BAR)
   - If BAR changes later, FOO will reflect the new value when used.

3. ?= (Conditional assignment):
   - Assigns a value only if the variable is not already set.
   - Example: FOO ?= default_value
   - If FOO is already set, it keeps its current value.

Priority (from highest to lowest): := > = > ?=

Examples:

```makefile
BAR = World
FOO := Hello $(BAR)
BAR = Make
TEST = $(FOO) $(BAR)

all:
    @echo $(FOO)  # Outputs: Hello World
    @echo $(TEST) # Outputs: Hello World Make
```

Bash equivalents:

1. := (Simple expansion):
   ```bash
   FOO=$(echo $BAR)
   ```

2. = (Recursive expansion):
   ```bash
   FOO='$BAR'
   ```

3. ?= (Conditional assignment):
   ```bash
   : ${FOO:=default_value}
   ```

In Bash, variable expansion happens immediately by default, so achieving the exact behavior of Makefile's recursive expansion is not straightforward. The closest equivalent is using single quotes to defer expansion.
