@SuppressWarnings("all");
package ruintec;

import mindustry.mod.Mod.*;

import ruintec.*;
import ruintec.content.planet.RingMesh.*;

public class 原版拓展 extends Mod {
	public static final String MOD_NAME = "原版拓展";
    @Override
    public void loadContent() {
        RingMesh.load();
    }
}