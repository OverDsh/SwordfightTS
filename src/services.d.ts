type Assets = Folder & {
	Timer: BillboardGui & {
		TimerText: TextLabel;
	};
};

interface ServerStorage extends Instance {
	Assets: Assets;
}

interface Workspace extends Model {
	["Moun.(s)"]: Folder;
	SpawnCircle: UnionOperation;
	Part: Part;
	WorldBarrier: UnionOperation;
	Island: Model;
	Well: Model & {
		PromptPart: Part;
		Lol: Part & {
			Mesh: CylinderMesh;
			Bubbles: ParticleEmitter;
		};
		Handle: Model & {
			Main: Part & {
				Mesh: SpecialMesh;
			};
			Click: Part & {
				ClickDetector: ClickDetector & {
					ClickedEvent: RemoteEvent;
				};
			};
		};
		TopWheel: Model & {
			Main: Part;
		};
		Part: Part;
	};
	Camera: Camera;
	["Tree(s)"]: Folder;
	SpawnPoints: Model;
}
