package main

import (
	"fmt"
	"net/http"
)


func main() {
	http.HandleFunc("/feed.json", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, World!")
	})

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
		
	}
}