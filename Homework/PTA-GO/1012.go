package main

import (
	. "fmt"
)

func main() {
	var (
		T, a2sum, a4sum int
		F               bool
	)
	Scanf("%d", &T)
	S, A := make([]int, T), make([]int, 5)
	for i := 0; i < T; i++ {
		Scanf("%d", &S[i])
	}
	for _, v := range S {
		if v%5 == 0 && v%2 == 0 {
			A[0] += v
		}
		if v%5 == 1 {
			A[1]++
			if F {
				a2sum -= v
			} else {
				a2sum += v
			}
			F = !F
		}
		if v%5 == 2 {
			A[2]++
		}
		if v%5 == 3 {
			a4sum += v
			A[3]++
		}
		if v%5 == 4 {
			if A[4] < v {
				A[4] = v
			}
		}
	}
	for i, v := range A {
		if v == 0 {
			Printf("N")
		} else if i == 1 {
			Printf("%d", a2sum)
		} else if i == 3 {
			a4 := float32(a4sum) / float32(v)
			Printf("%.1f", a4)
		} else {
			Printf("%d", v)
		}
		if i != len(A)-1 {
			Printf(" ")
		}
	}
}
