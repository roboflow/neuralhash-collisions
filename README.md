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
