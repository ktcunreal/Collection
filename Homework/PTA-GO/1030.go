package main

import (
	"bufio"
	. "fmt"
	"os"
	. "sort"
)

var T int
var p int64

func main() {
	Scanf("%d%d", &T, &p)
	S := make([]int, T)
	input := bufio.NewScanner(os.Stdin)
	input.Split(bufio.ScanWords)
	for i := 0; i < T; i++ {
		input.Scan()
		S[i] = btoi(input.Bytes())
	}
	Ints(S)
	M := 0
	for i := 0; i < T; i++ {
		for j := i + M; j < T; j++ {
			if S[j] <= S[i]*p {
				M = j - i + 1
			} else {
				break
			}
		}
	}
	Println(M)
}
func btoi(b []byte) (res int) {
	if b[0] == 45 {
		for i := 1; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
		res = -res
	} else {
		for i := 0; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
	}
	return
}
