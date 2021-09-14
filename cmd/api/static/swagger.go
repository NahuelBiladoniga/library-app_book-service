package static

import "embed"

//go:embed swagger.yaml
var Swagger embed.FS
