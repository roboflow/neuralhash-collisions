# neuralhash-collisions
A catalog of naturally occurring images whose Apple NeuralHash is identical.

See this [NeuralHash collision blog post](https://blog.roboflow.com/nerualhash-collision/) with full details and background.

## Contributing

PRs are welcome and encouraged! You can find the code to run NeuralHash on images in 
[this repo](https://github.com/AsuharietYgvar/AppleNeuralHash2ONNX). 
Please do not submit artificially generated adversarial examples. This repo is meant to document 
natural collisions found in the wild.

Please follow the example format (add a folder in `collisions` named with the colliding hash and
containing the example images with a README cataloging information about their provenance). Ideally
provide evidence that these images existed prior to the public divulgence of the NeuralHash weights
to prove that they are not artificial.

## Suggested Methodology

There are many [open source image datasets](https://universe.roboflow.com)
which contain a wide variety of images.

If you generate a NeuralHash for each one, store the image path / hash pairs in
a text file, sort them by hash, and compare adjacent lines' hashes, you
can quickly check n^2 image pairs (where `n` is the size of the dataset).

There are some example scripts you may adapt in the `utils` directory.

## Hash Lists

You may also compare your hashes against the ImageNet hashes using the txt
file archived in the `imagenet` directory.

If you check a large, public corpus please PR the hash list so others can
easily compare them for collisions across sources.
