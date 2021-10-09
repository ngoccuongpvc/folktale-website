package firebase_storage

import (
	"context"
	"log"

	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var Bucket *storage.BucketHandle

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

	if err != nil {
		log.Fatalln(err)
	}
}
