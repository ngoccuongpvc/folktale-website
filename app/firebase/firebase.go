package firebase

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var Bucket *storage.BucketHandle
var Firestore *firestore.Client

func init() {
	config := &firebase.Config{
		StorageBucket: "folktale-8a942.appspot.com",
	}
	opt := option.WithCredentialsFile("serviceAccount.json")
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalln(err)
	}
	client, err := app.Storage(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	Bucket, err = client.DefaultBucket()
	Firestore, err = app.Firestore(context.Background())

	if err != nil {
		log.Fatalln(err)
	}

	_, _, err = Firestore.Collection("users").Add(context.Background(), map[string]interface{}{
		"first":  "Alan",
		"middle": "Mathison",
		"last":   "Turing",
		"born":   1912,
	})
	if err != nil {
		log.Fatalf("Failed adding aturing: %v", err)
	}
}
