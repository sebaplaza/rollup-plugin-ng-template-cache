import { z } from "zod";
import templateCache from "angular-template-cache";
import defaultOptions from "angular-template-cache/lib/defaults";

const TargetsSchema = z
	.object({
		filesGlob: z.string(),
		moduleName: z.string(),
		output: z.string(),
	})
	.array();

type TargetsType = z.infer<typeof TargetsSchema>;

export default function ngTemplateCache(targets: TargetsType = []) {
	const targetsValidated = TargetsSchema.parse(targets);

	return {
		name: "ng-template-cache",
		buildStart(options) {
			targetsValidated.forEach((target) => {
				const { filesGlob, moduleName, output } = target;
				templateCache({ ...defaultOptions, filesGlob, moduleName, output });
			});
		},
	};
}
