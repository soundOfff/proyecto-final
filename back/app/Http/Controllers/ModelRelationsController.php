<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use ReflectionClass;

class ModelRelationsController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'model' => 'required|string',
        ]);

        $model = "App\\Models\\$request->model";

        if (! class_exists($model)) {
            return response()->json(['error' => 'Model not found'], 404);
        }

        $relations = $this->getAttributesAndRelations(new $model, new $model);

        return response()->json($relations);
    }

    private function getAttributesAndRelations($root, $model, $visited = ['model' =>[], 'relation' =>[]], $prefix = '', $maxDepth = 2)
    {
        $attributes = $model->getFillable();
        $relations = $this->getModelRelations($model);

        $result = [];

        foreach ($attributes as $attribute) {
            $result[] = $prefix.$attribute;
        }

        if ($maxDepth > 0) {
            foreach ($relations as $relation) {
                $relationName = $relation['name'];
                $relatedModel = $model->$relationName()->getRelated();
                $relatedModelClass = get_class($relatedModel);
                // dump(substr($relationName, -4));

                if ($relatedModelClass == get_class($root) && $relation['type'] != MorphTo::class) {
                    continue;
                }
                if (in_array($relatedModelClass, $visited['model']) && in_array($model->$relationName, $visited['relation'])) {
                    continue;
                }
                $visited['model'][] = $relatedModelClass;
                $visited['relation'][] = $relationName;
                $result = array_merge($result, $this->getAttributesAndRelations($root, $relatedModel, $visited, $prefix.$relation['name'].'.', $maxDepth - 1));
            }
        }

        return $result;
    }

    private function getModelRelations($model)
    {
        $relations = [];
        $reflection = new ReflectionClass($model);

        foreach ($reflection->getMethods() as $method) {
            if ($method->class == get_class($model) && $method->isPublic() && ! $method->isStatic() && $method->getNumberOfParameters() == 0) {
                $returnType = $method->getReturnType();
                if ($returnType && is_subclass_of($returnType->getName(), Relation::class)) {
                    $relations[] = ['name'=> $method->getName(), 'type' => $returnType->getName()];
                }
            }
        }

        return $relations;
    }
}
