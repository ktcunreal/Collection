package main

import (
	. "fmt"
)

func main() {
	var (
		n, m int
	)
	Scanf("%d%d ", &n, &m)
	m = m % n
	var S [100]int
	for i := 0; i < n; i++ {
		Scanf("%d", &S[i])
	}
	for i := 0; i < n; i++ {
		if i < m {
			Printf("%d", S[n-m+i])
		} else {
			Printf("%d", S[i-m])
		}
		if i != n-1 {
			Printf(" ")
		}
	}
}
