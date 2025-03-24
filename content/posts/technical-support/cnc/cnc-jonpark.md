# find out the items of vpc_private_subnets  

## 입력
```bash
 cluster_name = "cnc-test-cluster"
cluster_region = "ap-northeast-2"
vpc_cidr_block = "10.0.0.0/16"
vpc_id = "vpc-0ee6ce9b74a82d087"
vpc_nat_public_ips = tolist([
  "3.35.204.211",
])
vpc_private_subnets = [
  "subnet-0329309bce8fe3cd7",
  "subnet-0a3426c348f958ac0",
]
vpc_public_subnets = [
  "subnet-0a042f89e148e823e",
  "subnet-0035ab195d22e6cd0",
]
```


You can use the following `sed` command to find out the items of `vpc_private_subnets`:

```
sed -n 's/.*vpc_private_subnets = \[\(.*\)\].*/\1/p' <filename>
```

Replace `<filename>` with the name of the file containing the above configuration. The `sed` command will extract the contents of `vpc_private_subnets` and print them out.

Here's an explanation of the command:

- `-n` option suppresses the default output, so only the pattern that matches will be printed.
- `s` command is used for substitution in `sed`.
- `.*vpc_private_subnets = \[` matches any characters followed by `vpc_private_subnets = [`.
- `\(.*\)` matches any characters and saves it as a group. The group contents can be referred to as `\1` in the replacement text.
- `\]` matches the closing square bracket.
- `.*` matches any remaining characters.
- `/p` at the end of the command prints the matched pattern.

The output will be:

```
"subnet-0329309bce8fe3cd7",
"subnet-0a3426c348f958ac0",
```

---
#  how to change from 
vpc_nat_public_ips

## input

vpc_nat_public_ips = tolist([
  "3.35.204.211",
])
to 
vpc_nat_public_ips = [
  "3.35.204.211",
]

## response

You can use the `sed` command in Linux to replace the `vpc_nat_public_ips` variable in your file from a `tolist()` function to a list directly. You can use the following command:

```
sed -i 's/vpc_nat_public_ips = tolist(\[\(\S*\)\])/vpc_nat_public_ips = [\1]/g' your_file.py
```

This command will replace the `vpc_nat_public_ips` variable with a list directly by removing the `tolist()` function and its parentheses. It uses a regular expression to capture the IP address within the `tolist()` function and replace it with the same IP address enclosed in square brackets. The `-i` option modifies the file in-place.

Note that this command assumes that the variable is defined in a Python file and that the IP address is the only element in the list. If your situation is different, you may need to adjust the regular expression accordingly.

---
You can use the following `sed` command to change from the `tolist()` function to a list in the given format:

```
sed -i 's/vpc_nat_public_ips = tolist(\[\([^]]*\)\])/vpc_nat_public_ips = [\1]/g' your_file.py
```

This command uses the `-i` option to modify the file in place. It searches for the `vpc_nat_public_ips` variable assignment line that contains the `tolist()` function call, captures the contents of the square brackets using a regular expression, and replaces the entire line with the same variable assignment line but with the `tolist()` function call removed and the contents of the square brackets enclosed in square brackets again.

Note that this command assumes that the `vpc_nat_public_ips` variable is assigned only once in the file and that the IP address is the only element in the list. If there are multiple occurrences or if there are other elements in the list, you may need to adjust the regular expression accordingly.


---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 

---
# 